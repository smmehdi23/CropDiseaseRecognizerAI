from flask import Flask, render_template, request, jsonify, send_from_directory
import os
import sys
from werkzeug.utils import secure_filename

# Add backend directory to path for model imports
backend_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'backend')
sys.path.insert(0, backend_path)

# Import model loader
try:
    from model_loader import get_model_loader
    print("[Flask] Initializing model loader...")
    model_loader = get_model_loader(backend_path)
    print("[Flask] Model loader initialized OK")
except Exception as e:
    print(f"[Flask] Error initializing model loader: {e}")
    import traceback
    traceback.print_exc()
    model_loader = None

app = Flask(__name__, 
    template_folder=os.path.dirname(os.path.abspath(__file__)),
    static_folder=None)

app.config['JSON_SORT_KEYS'] = False

# Configuration
UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'bmp'}
MAX_FILE_SIZE = 16 * 1024 * 1024

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = MAX_FILE_SIZE


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def get_app_root():
    return os.path.dirname(os.path.abspath(__file__))


# Routes
@app.route('/')
def index():
    return send_from_directory(get_app_root(), 'index.html')


@app.route('/css/<path:filename>')
def serve_css(filename):
    return send_from_directory(os.path.join(get_app_root(), 'css'), filename)


@app.route('/js/<path:filename>')
def serve_js(filename):
    return send_from_directory(os.path.join(get_app_root(), 'js'), filename)


@app.route('/uploads/<path:filename>')
def serve_upload(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


# API Endpoints
@app.route('/api/upload', methods=['POST'])
def upload_image():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file type. Allowed: PNG, JPG, JPEG, GIF, BMP'}), 400
        
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        return jsonify({
            'success': True,
            'filename': filename,
            'filepath': f'/uploads/{filename}'
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/detect', methods=['POST'])
def detect_disease():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        
        if file.filename == '' or not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file'}), 400
        
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        # Get confidence threshold from request (default: 0.65)
        threshold = request.form.get('threshold', '0.65')
        try:
            threshold = float(threshold)
            threshold = max(0.5, min(0.99, threshold))  # Clamp between 0.5 and 0.99
        except (ValueError, TypeError):
            threshold = 0.65
        
        # Check that model loader is available
        if not model_loader:
            return jsonify({
                'error': 'Model loader not initialized. Cannot analyze images.'
            }), 503
        
        try:
            print(f"[API] Analyzing image: {filename}")
            prediction = model_loader.predict(filepath, confidence_threshold=threshold)
            
            if 'error' in prediction:
                print(f"[API] Prediction error: {prediction['error']}")
                return jsonify({'error': prediction['error']}), 500
            
            print(f"[API] Prediction OK: {prediction['disease']} (confidence: {prediction['confidence']:.2%})")
            
            # Map disease names to database info
            disease_info = get_disease_info(prediction['disease'], prediction['crop'])
            
            # Check if heatmap was generated
            heatmap_status = "generated" if prediction.get('heatmap') else "not generated"
            print(f"[API] Heatmap: {heatmap_status}")
            
            response = {
                'success': True,
                'image_name': filename,
                'image_path': f'/uploads/{filename}',
                'crop': prediction['crop'],
                'disease': prediction['disease'],
                'confidence': prediction['confidence'],
                'severity': disease_info.get('severity', 'Unknown'),
                'description': disease_info.get('description', 'Disease detected by model'),
                'recommendations': disease_info.get('recommendations', []),
                'pathogen': disease_info.get('pathogen', 'Unknown'),
                'heatmap': prediction.get('heatmap', None)  # Include Grad-CAM heatmap
            }
            
            return jsonify(response), 200
            
        except Exception as e:
            print(f"[API] Prediction error: {e}")
            import traceback
            traceback.print_exc()
            return jsonify({'error': f'Analysis failed: {str(e)}'}), 500
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


def get_disease_info(disease_name, crop):
    """Get disease information from database"""
    diseases_db = {
        'wheat': {
            'Wheat Stem fly': {
                'severity': 'High',
                'pathogen': 'Meromyza species',
                'description': 'Wheat Stem Fly causes severe damage by laying eggs in stems. Hollow stems and yellowing of affected tissues.',
                'recommendations': ['Insecticide application at seedling stage', 'Crop rotation', 'Remove affected plants', 'Monitor for pest presence']
            },
            'Healthy Wheat': {
                'severity': 'None',
                'pathogen': 'None',
                'description': 'Crop appears healthy with no visible disease symptoms.',
                'recommendations': ['Continue regular monitoring', 'Maintain proper irrigation', 'Apply preventive fungicides when needed']
            },
            'Wheat Healthy': {
                'severity': 'None',
                'pathogen': 'None',
                'description': 'Crop appears healthy with no visible disease symptoms.',
                'recommendations': ['Continue regular monitoring', 'Maintain proper irrigation', 'Apply preventive fungicides when needed']
            },
            'Wheat aphid': {
                'severity': 'Medium',
                'pathogen': 'Sitobion avenae',
                'description': 'Yellowing of leaves, sticky honeydew residue, stunted growth.',
                'recommendations': ['Insecticidal spray', 'Encourage natural predators', 'Balanced fertilization']
            },
            'Flag Smut': {
                'severity': 'High',
                'pathogen': 'Urocystis tritici',
                'description': 'Black spore masses replace leaf tissue causing severe crop loss.',
                'recommendations': ['Use certified disease-free seed', 'Seed treatment with systemic fungicides', 'Crop rotation']
            },
            'Wheat black rust': {
                'severity': 'High',
                'pathogen': 'Puccinia graminis',
                'description': 'Black pustules on leaves and stems causing severe defoliation.',
                'recommendations': ['Triazole fungicide application', 'Use resistant varieties', 'Avoid excess nitrogen']
            },
            'Wheat leaf blight': {
                'severity': 'High',
                'pathogen': 'Bipolaris sorokiniana',
                'description': 'Dark brown lesions with purple borders, progressive leaf death.',
                'recommendations': ['Triazole fungicide application', 'Use resistant cultivars', 'Remove crop residues']
            },
            'Wheat powdery mildew': {
                'severity': 'Medium',
                'pathogen': 'Blumeria graminis',
                'description': 'White powdery coating on leaves and stems.',
                'recommendations': ['Sulfur dust application', 'Ensure good air circulation', 'Avoid excess nitrogen']
            },
            'Wheat scab': {
                'severity': 'High',
                'pathogen': 'Fusarium graminearum',
                'description': 'Bleached grain heads with premature death.',
                'recommendations': ['Fungicide application at flowering', 'Use resistant varieties', 'Remove infected residues']
            },
            'Wheat mite': {
                'severity': 'Medium',
                'pathogen': 'Acari species',
                'description': 'Stippling and discoloration on leaves from mite feeding.',
                'recommendations': ['Miticide application', 'Dust management', 'Irrigation management']
            },
            'Wheat___Yellow_Rust': {
                'severity': 'High',
                'pathogen': 'Puccinia striiformis',
                'description': 'Yellow pustules in stripes on leaves.',
                'recommendations': ['Triazole fungicide application', 'Use resistant varieties', 'Early disease detection']
            }
        },
        'maize': {
            'Army worm': {
                'severity': 'High',
                'pathogen': 'Spodoptera exempta',
                'description': 'Caterpillars strip leaves rapidly, causing complete defoliation of young plants.',
                'recommendations': ['Insecticidal spray at early infestation', 'Biological control with Bacillus thuringiensis', 'Early planting to avoid peak pest periods']
            },
            'Common_Rust': {
                'severity': 'Medium',
                'pathogen': 'Puccinia sorghi',
                'description': 'Brick-red to brown pustules on both leaf surfaces.',
                'recommendations': ['Fungicide application (triazoles)', 'Use resistant hybrids', 'Monitor from tasseling stage']
            },
            'Gray_Leaf_Spot': {
                'severity': 'High',
                'pathogen': 'Cercospora zeae-maydis',
                'description': 'Long, narrow, rectangular tan to gray lesions on leaves.',
                'recommendations': ['Fungicide application', 'Crop rotation', 'Use resistant varieties', 'Improve field drainage']
            },
            'maize stem borer': {
                'severity': 'High',
                'pathogen': 'Chilo partellus',
                'description': 'Tunneling in stems causing dead hearts in young plants and lodging.',
                'recommendations': ['Insecticidal spray', 'Use resistant hybrids', 'Deep plowing', 'Crop rotation']
            },
            'Healthy Maize': {
                'severity': 'None',
                'pathogen': 'None',
                'description': 'Crop appears healthy with vigorous growth.',
                'recommendations': ['Continue regular crop care', 'Monitor for pests and diseases']
            },
            'maize fall armyworm': {
                'severity': 'High',
                'pathogen': 'Spodoptera frugiperda',
                'description': 'Damage to leaf whorls and developing cobs.',
                'recommendations': ['Insecticidal spray', 'Apply Bacillus thuringiensis', 'Manual removal', 'Early planting']
            },
            'maize ear rot': {
                'severity': 'High',
                'pathogen': 'Fusarium verticillioides',
                'description': 'Fungal infection of ear causing rot and grain damage.',
                'recommendations': ['Use resistant varieties', 'Proper drying of grain', 'Remove infected cobs', 'Crop rotation']
            }
        },
        'rice': {
            'Brownspot': {
                'severity': 'Medium',
                'pathogen': 'Cochliobolus miyabeanus',
                'description': 'Brown oval spots on leaves and dark brown discoloration of grains.',
                'recommendations': ['Potassium fertilization', 'Fungicide application', 'Use certified seeds', 'Maintain proper water management']
            },
            'Tungro': {
                'severity': 'High',
                'pathogen': 'Rice Tungro Bacilliform Virus (RTBV) + Rice Tungro Spherical Virus (RTSV)',
                'description': 'Yellow-orange leaf discoloration and stunted growth transmitted by green leafhoppers.',
                'recommendations': ['Control leafhopper vector with insecticide', 'Use resistant varieties', 'Remove and destroy infected plants', 'Avoid planting near infected fields']
            },
            'Rice Blast': {
                'severity': 'High',
                'pathogen': 'Magnaporthe oryzae',
                'description': 'Brown lesions on leaves with white center and red border. Can affect panicles.',
                'recommendations': ['Fungicide application', 'Use resistant varieties', 'Improve drainage', 'Avoid excess nitrogen']
            },
            'Becterial Blight in Rice': {
                'severity': 'High',
                'pathogen': 'Xanthomonas oryzae',
                'description': 'Water-soaked leaf margins, yellowing from edges inward.',
                'recommendations': ['Use resistant varieties', 'Copper hydroxide spray', 'Avoid flood irrigation', 'Remove infected leaves']
            },
            'Rice Healthy': {
                'severity': 'None',
                'pathogen': 'None',
                'description': 'Crop appears healthy with vigorous growth.',
                'recommendations': ['Continue regular monitoring', 'Maintain proper water management']
            }
        },
        'sugarcane': {
            'Leaf smut': {
                'severity': 'High',
                'pathogen': 'Ustilago scitaminea',
                'description': 'Whip-like black spore masses emerging from the growing point instead of a normal shoot.',
                'recommendations': ['Use disease-free planting material', 'Hot water treatment of seed cane', 'Remove and destroy affected stools']
            },
            'Sugarcane Healthy': {
                'severity': 'None',
                'pathogen': 'None',
                'description': 'Crop appears healthy with vigorous stalk growth.',
                'recommendations': ['Maintain proper irrigation', 'Apply balanced fertilization']
            },
            'RedRot sugarcane': {
                'severity': 'High',
                'pathogen': 'Colletotrichum falcatum',
                'description': 'Red discoloration of internodes with white fungal strands.',
                'recommendations': ['Use resistant varieties', 'Avoid mechanical damage', 'Proper field sanitation']
            },
            'Red Rot sugarcane': {
                'severity': 'High',
                'pathogen': 'Colletotrichum falcatum',
                'description': 'Red discoloration of internodes with white fungal strands.',
                'recommendations': ['Use resistant varieties', 'Avoid mechanical damage', 'Proper field sanitation']
            },
            'RedRust sugarcane': {
                'severity': 'High',
                'pathogen': 'Puccinia melanocephala',
                'description': 'Rust-colored pustules on leaf surface.',
                'recommendations': ['Use resistant varieties', 'Fungicide application', 'Improve air circulation']
            },
            'Yellow Rust Sugarcane': {
                'severity': 'High',
                'pathogen': 'Puccinia kuehnii',
                'description': 'Yellow rust pustules on leaves.',
                'recommendations': ['Use resistant varieties', 'Fungicide application', 'Proper spacing']
            },
            'Mosaic sugarcane': {
                'severity': 'High',
                'pathogen': 'Sugarcane Mosaic Virus (SCMV)',
                'description': 'Mottling and discoloration of leaves in mosaic pattern.',
                'recommendations': ['Use virus-free seed cane', 'Avoid planting near infected fields', 'Control aphid vectors']
            }
        },
        'cotton': {
            'Leaf Curl': {
                'severity': 'High',
                'pathogen': 'Cotton Leaf Curl Virus (CLCuV)',
                'description': 'Upward or downward curling of leaves with vein thickening and enations. Causes severe yield loss.',
                'recommendations': ['Control whitefly vector with systemic insecticides', 'Use resistant varieties', 'Remove volunteer cotton plants', 'Avoid late sowings']
            },
            'Wilt': {
                'severity': 'High',
                'pathogen': 'Fusarium oxysporum / Verticillium dahliae',
                'description': 'Sudden wilting of plant parts, vascular brown discoloration, plant death.',
                'recommendations': ['Use resistant varieties', 'Soil solarization', 'Crop rotation', 'Balanced fertilization avoiding excess nitrogen']
            },
            'thirps on  cotton': {
                'severity': 'Medium',
                'pathogen': 'Thrips tabaci',
                'description': 'Silver-grey streaks on leaves, distortion of young leaves, flower damage.',
                'recommendations': ['Systemic insecticide spray', 'Yellow sticky traps', 'Reflective mulches', 'Remove weeds']
            },
            'Healthy cotton': {
                'severity': 'None',
                'pathogen': 'None',
                'description': 'Crop appears healthy with normal growth.',
                'recommendations': ['Continue regular monitoring', 'Maintain proper irrigation and nutrition']
            },
            'Cotton Aphid': {
                'severity': 'Medium',
                'pathogen': 'Aphis gossypii',
                'description': 'Yellowing leaves, sticky honeydew, sooty mold development.',
                'recommendations': ['Insecticidal spray', 'Encourage natural predators', 'Balanced fertilization']
            },
            'bollworm on Cotton': {
                'severity': 'High',
                'pathogen': 'Earias species',
                'description': 'Damage to flowers, bolls, and developing cotton.',
                'recommendations': ['Insecticidal spray', 'Pheromone traps', 'Regular monitoring', 'Hand-picking']
            },
            'American Bollworm on Cotton': {
                'severity': 'High',
                'pathogen': 'Helicoverpa armigera',
                'description': 'Damage to bolls and developing cotton.',
                'recommendations': ['Insecticidal spray', 'Pheromone traps', 'Biological control', 'Crop rotation']
            },
            'Anthracnose on Cotton': {
                'severity': 'High',
                'pathogen': 'Colletotrichum species',
                'description': 'Dark lesions on stems, petioles, and bolls.',
                'recommendations': ['Fungicide application', 'Use resistant varieties', 'Improve air circulation', 'Remove infected material']
            },
            'cotton mealy bug': {
                'severity': 'Medium',
                'pathogen': 'Maconellicoccus hirsutus',
                'description': 'White powdery coating, honeydew secretion.',
                'recommendations': ['Insecticidal spray', 'Encourage parasitoids', 'Avoid excess nitrogen fertilization']
            },
            'cotton whitefly': {
                'severity': 'Medium',
                'pathogen': 'Bemisia tabaci',
                'description': 'Yellow leaves, leaf curling, virus transmission.',
                'recommendations': ['Yellow sticky traps', 'Insecticidal spray', 'Remove weeds', 'Avoid excess nitrogen']
            },
            'pink bollworm in cotton': {
                'severity': 'High',
                'pathogen': 'Pectinophora gossypiella',
                'description': 'Damage to bolls and seeds.',
                'recommendations': ['Insecticidal spray', 'Pheromone traps', 'Sanitation', 'Winter plowing']
            },
            'red cotton bug': {
                'severity': 'Medium',
                'pathogen': 'Dysdercus species',
                'description': 'Staining of fibers, reduced quality.',
                'recommendations': ['Insecticidal spray', 'Remove crop residues', 'Sanitation', 'Avoid excess nitrogen']
            },
            'bollrot on Cotton': {
                'severity': 'High',
                'pathogen': 'Bacterial species',
                'description': 'Rotting of cotton bolls.',
                'recommendations': ['Fungicide application', 'Improve drainage', 'Remove infected bolls', 'Use resistant varieties']
            }
        }
    }
    
    # Try to find disease in database
    crop_diseases = diseases_db.get(crop, {})
    if disease_name in crop_diseases:
        return crop_diseases[disease_name]
    
    # Try partial matching
    for db_disease, info in crop_diseases.items():
        if disease_name.lower() in db_disease.lower() or db_disease.lower() in disease_name.lower():
            return info
    
    # Return default info
    return {
        'severity': 'Unknown',
        'pathogen': 'Unknown',
        'description': f'Disease detected: {disease_name}',
        'recommendations': ['Monitor plant health', 'Consult agricultural extension', 'Take preventive measures']
    }


@app.route('/api/health', methods=['GET'])
def health_check():
    # Report status of both distinct models
    models_status = {}
    if model_loader:
        for key in ['finetuned', 'base']:
            models_status[key] = 'loaded' if key in model_loader.models else 'not loaded'

    return jsonify({
        'status': 'healthy',
        'app': 'Crop Disease Recognizer',
        'version': '1.0.0',
        'models_loaded': len(model_loader.models) if model_loader else 0,
        'model_loader_ready': model_loader is not None,
        'models_status': models_status
    }), 200


@app.route('/api/diseases', methods=['GET'])
def get_diseases():
    """Get list of known diseases"""
    diseases = [
        # Wheat Diseases
        {'id': 'w0', 'name': 'Healthy Wheat', 'pathogen': 'None', 'severity': 'None', 'crops': ['Wheat'], 'prevalence': 0},
        {'id': 'w1', 'name': 'Wheat Stem fly', 'pathogen': 'Meromyza species', 'severity': 'High', 'crops': ['Wheat'], 'prevalence': 18},
        {'id': 'w2', 'name': 'Wheat Aphid', 'pathogen': 'Sitobion avenae', 'severity': 'Medium', 'crops': ['Wheat'], 'prevalence': 15},
        {'id': 'w3', 'name': 'Wheat black rust', 'pathogen': 'Puccinia graminis', 'severity': 'High', 'crops': ['Wheat'], 'prevalence': 16},
        {'id': 'w4', 'name': 'Wheat___Yellow_Rust', 'pathogen': 'Puccinia striiformis', 'severity': 'High', 'crops': ['Wheat'], 'prevalence': 14},
        {'id': 'w5', 'name': 'Wheat powdery mildew', 'pathogen': 'Blumeria graminis', 'severity': 'Medium', 'crops': ['Wheat'], 'prevalence': 13},
        {'id': 'w6', 'name': 'Wheat leaf blight', 'pathogen': 'Bipolaris sorokiniana', 'severity': 'High', 'crops': ['Wheat'], 'prevalence': 14},
        {'id': 'w7', 'name': 'Wheat mite', 'pathogen': 'Acari species', 'severity': 'Medium', 'crops': ['Wheat'], 'prevalence': 12},
        {'id': 'w8', 'name': 'Wheat scab', 'pathogen': 'Fusarium graminearum', 'severity': 'High', 'crops': ['Wheat'], 'prevalence': 17},
        
        # Maize Diseases
        {'id': 'm0', 'name': 'Healthy Maize', 'pathogen': 'None', 'severity': 'None', 'crops': ['Maize'], 'prevalence': 0},
        {'id': 'm1', 'name': 'maize stem borer', 'pathogen': 'Chilo partellus', 'severity': 'High', 'crops': ['Maize'], 'prevalence': 20},
        {'id': 'm2', 'name': 'maize fall armyworm', 'pathogen': 'Spodoptera frugiperda', 'severity': 'High', 'crops': ['Maize'], 'prevalence': 19},
        {'id': 'm3', 'name': 'maize ear rot', 'pathogen': 'Fusarium verticillioides', 'severity': 'High', 'crops': ['Maize'], 'prevalence': 16},
        
        # Rice Diseases
        {'id': 'r0', 'name': 'Rice Healthy', 'pathogen': 'None', 'severity': 'None', 'crops': ['Rice'], 'prevalence': 0},
        {'id': 'r1', 'name': 'Becterial Blight in Rice', 'pathogen': 'Xanthomonas oryzae', 'severity': 'High', 'crops': ['Rice'], 'prevalence': 18},
        {'id': 'r2', 'name': 'Rice Blast', 'pathogen': 'Magnaporthe oryzae', 'severity': 'High', 'crops': ['Rice'], 'prevalence': 17},
        
        # Cotton Diseases
        {'id': 'c0', 'name': 'Healthy cotton', 'pathogen': 'None', 'severity': 'None', 'crops': ['Cotton'], 'prevalence': 0},
        {'id': 'c1', 'name': 'Cotton Aphid', 'pathogen': 'Aphis gossypii', 'severity': 'Medium', 'crops': ['Cotton'], 'prevalence': 12},
        {'id': 'c2', 'name': 'American Bollworm on Cotton', 'pathogen': 'Helicoverpa armigera', 'severity': 'High', 'crops': ['Cotton'], 'prevalence': 14},
        {'id': 'c3', 'name': 'Anthracnose on Cotton', 'pathogen': 'Colletotrichum species', 'severity': 'High', 'crops': ['Cotton'], 'prevalence': 13},
        {'id': 'c4', 'name': 'cotton mealy bug', 'pathogen': 'Maconellicoccus hirsutus', 'severity': 'Medium', 'crops': ['Cotton'], 'prevalence': 11},
        {'id': 'c5', 'name': 'cotton whitefly', 'pathogen': 'Bemisia tabaci', 'severity': 'Medium', 'crops': ['Cotton'], 'prevalence': 12},
        {'id': 'c6', 'name': 'pink bollworm in cotton', 'pathogen': 'Pectinophora gossypiella', 'severity': 'High', 'crops': ['Cotton'], 'prevalence': 13},
        {'id': 'c7', 'name': 'red cotton bug', 'pathogen': 'Dysdercus species', 'severity': 'Medium', 'crops': ['Cotton'], 'prevalence': 10},
        {'id': 'c8', 'name': 'bollrot on Cotton', 'pathogen': 'Bacterial species', 'severity': 'High', 'crops': ['Cotton'], 'prevalence': 12},
        
        # Sugarcane Diseases
        {'id': 's0', 'name': 'Sugarcane Healthy', 'pathogen': 'None', 'severity': 'None', 'crops': ['Sugarcane'], 'prevalence': 0},
        {'id': 's1', 'name': 'RedRot sugarcane', 'pathogen': 'Colletotrichum falcatum', 'severity': 'High', 'crops': ['Sugarcane'], 'prevalence': 12},
        {'id': 's2', 'name': 'RedRust sugarcane', 'pathogen': 'Puccinia melanocephala', 'severity': 'High', 'crops': ['Sugarcane'], 'prevalence': 13},
        {'id': 's3', 'name': 'Yellow Rust Sugarcane', 'pathogen': 'Puccinia kuehnii', 'severity': 'High', 'crops': ['Sugarcane'], 'prevalence': 13},
        {'id': 's4', 'name': 'Mosaic sugarcane', 'pathogen': 'Sugarcane Mosaic Virus (SCMV)', 'severity': 'High', 'crops': ['Sugarcane'], 'prevalence': 12},
    ]
    return jsonify({'diseases': diseases, 'total': len(diseases)}), 200




@app.errorhandler(404)
def handle_404(e):
    if request.path.startswith('/api/'):
        return jsonify({'error': 'API endpoint not found'}), 404
    if request.path.startswith('/css/') or request.path.startswith('/js/') or request.path.startswith('/uploads/'):
        return jsonify({'error': 'File not found'}), 404
    return send_from_directory(get_app_root(), 'index.html')


@app.errorhandler(500)
def handle_500(e):
    return jsonify({'error': 'Internal server error'}), 500


if __name__ == '__main__':
    print("=" * 60)
    print("Crop Disease Recognizer")
    print("=" * 60)
    print("Starting Flask server...")
    print("Open your browser and go to: http://localhost:5000")
    print("=" * 60)
    
    app.run(
        debug=False,
        host='0.0.0.0',
        port=5000,
        use_reloader=False
    )
