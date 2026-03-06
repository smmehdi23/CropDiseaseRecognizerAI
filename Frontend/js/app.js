const diseasesDatabase = [
    { id: "w0", name: "Healthy Wheat", pathogen: "None", type: "Healthy", severity: "None", crops: ["Wheat"], prevalence: 0, symptoms: ["Green foliage", "Normal growth", "No visible lesions", "Vigorous plant"], treatment: ["Continue regular maintenance", "Monitor for pest presence", "Maintain proper irrigation", "Apply preventive fungicides when needed"] },
    { id: "w1", name: "Wheat Stem Fly", pathogen: "Meromyza species", type: "Pest", severity: "High", crops: ["Wheat"], prevalence: 18, symptoms: ["White longitudinal lines on leaves", "Hollow stems", "Yellowing of affected tissues", "Poor grain development"], treatment: ["Insecticide application at seedling stage", "Crop rotation", "Remove affected plants", "Monitor for pest presence"] },
    { id: "w2", name: "Wheat Aphid", pathogen: "Sitobion avenae", type: "Pest", severity: "Medium", crops: ["Wheat"], prevalence: 15, symptoms: ["Yellowing of leaves", "Sticky honeydew residue", "Stunted growth", "Leaf curling"], treatment: ["Insecticidal spray", "Encourage natural predators", "Balanced fertilization", "Early detection monitoring"] },
    { id: "w3", name: "Wheat Brown Leaf Rust", pathogen: "Puccinia triticina", type: "Fungal", severity: "High", crops: ["Wheat"], prevalence: 16, symptoms: ["Brown-orange pustules on leaves", "Yellowing around lesions", "Leaf drying", "Severe cases lead to defoliation"], treatment: ["Triazole fungicide application", "Use resistant varieties", "Avoid excess nitrogen", "Apply fungicide at flag leaf stage"] },
    { id: "w4", name: "Wheat Yellow Rust", pathogen: "Puccinia striiformis", type: "Fungal", severity: "High", crops: ["Wheat"], prevalence: 14, symptoms: ["Yellow-orange stripes on leaves", "Stunted growth", "Poor grain fill", "Yellow discoloration of foliage"], treatment: ["Fungicide application in early season", "Plant resistant varieties", "Monitor weather patterns", "Apply preventive sprays"] },
    { id: "w5", name: "Wheat Powdery Mildew", pathogen: "Blumeria graminis", type: "Fungal", severity: "Medium", crops: ["Wheat"], prevalence: 13, symptoms: ["White powdery coating on leaves", "Reduced light penetration", "Leaf distortion", "Stunted grain development"], treatment: ["Sulfur fungicide", "Use resistant varieties", "Improve air circulation", "Avoid excessive nitrogen fertilization"] },
    { id: "w6", name: "Wheat Leaf Blight", pathogen: "Bipolaris sorokiniana", type: "Fungal", severity: "High", crops: ["Wheat"], prevalence: 14, symptoms: ["Dark brown lesions with purple borders", "Necrotic leaf areas", "Progressive leaf death", "Weakened grain fill"], treatment: ["Triazole fungicide application", "Use resistant cultivars", "Remove crop residues", "Proper crop rotation"] },
    { id: "w7", name: "Wheat Black Rust", pathogen: "Puccinia graminis", type: "Fungal", severity: "High", crops: ["Wheat"], prevalence: 12, symptoms: ["Black spore pustules on leaves", "Reddish-brown lesions", "Severe leaf damage", "Weak stems and poor grain development"], treatment: ["Early-season fungicide", "Plant resistant varieties", "Prevent volunteer cereals", "Monitor weather conditions"] },
    { id: "w8", name: "Wheat Scab", pathogen: "Fusarium graminearum", type: "Fungal", severity: "High", crops: ["Wheat"], prevalence: 17, symptoms: ["Pink or tan-colored spikelets", "Premature ripening", "Shriveled grains", "Reduced grain quality"], treatment: ["Carbendazim or propiconazole", "Use resistant varieties", "Proper field sanitation", "Avoid high humidity conditions"] },
    { id: "w9", name: "Flag Smut", pathogen: "Urocystis agropyri", type: "Fungal", severity: "Medium", crops: ["Wheat"], prevalence: 11, symptoms: ["Long black stripes on leaves", "Diseased flag leaf", "Reduced photosynthetic area", "Poor grain filling"], treatment: ["Fungicide seed treatment", "Use resistant varieties", "Remove affected plants", "Proper field rotation"] },
    { id: "w10", name: "Brownspot", pathogen: "Cochliobolus sativus", type: "Fungal", severity: "Medium", crops: ["Wheat"], prevalence: 10, symptoms: ["Small brown spots on leaves", "Lesions with dark borders", "Progressive leaf necrosis", "Reduced plant vigor"], treatment: ["Fungicide application", "Use resistant cultivars", "Remove infected residues", "Manage moisture levels"] },
    
    { id: "m0", name: "Healthy Maize", pathogen: "None", type: "Healthy", severity: "None", crops: ["Maize"], prevalence: 0, symptoms: ["Green foliage", "Vigorous growth", "No stem damage", "Normal ear development"], treatment: ["Continue regular crop care", "Monitor for pests and diseases", "Proper fertilization", "Adequate irrigation"] },
    { id: "m1", name: "Maize Stem Borer", pathogen: "Chilo partellus", type: "Pest", severity: "High", crops: ["Maize"], prevalence: 20, symptoms: ["Tunneling in stems", "Dead hearts in young plants", "Reduced stem strength", "Poor cob development"], treatment: ["Insecticidal spray at early stage", "Use resistant hybrids", "Deep plowing to destroy pupae", "Crop rotation"] },
    { id: "m2", name: "Maize Fall Armyworm", pathogen: "Spodoptera frugiperda", type: "Pest", severity: "High", crops: ["Maize"], prevalence: 19, symptoms: ["Ragged leaf damage", "Striping on leaves", "Ear and cob damage", "Frass (droppings) visible"], treatment: ["Insecticide application", "Biological control agents", "Remove affected plants", "Monitor early growth stages"] },
    { id: "m3", name: "Maize Ear Rot", pathogen: "Fusarium verticillioides", type: "Fungal", severity: "High", crops: ["Maize"], prevalence: 16, symptoms: ["Pink or white fungal growth on ears", "Kernel rot and discoloration", "Premature ear drying", "Reduced grain quality"], treatment: ["Use resistant hybrids", "Improve field drainage", "Proper crop rotation", "Remove infected cobs"] },
    { id: "m4", name: "Army Worm", pathogen: "Mythimna separata", type: "Pest", severity: "High", crops: ["Maize"], prevalence: 15, symptoms: ["Leaf damage and skeletonization", "Ragged holes in foliage", "Reduced leaf area", "Plant defoliation"], treatment: ["Insecticide spray", "Biological control with parasitoids", "Field sanitation", "Monitor plant health"] },
    { id: "m5", name: "Gray Leaf Spot", pathogen: "Cercospora zeae-maydis", type: "Fungal", severity: "Medium", crops: ["Maize"], prevalence: 14, symptoms: ["Rectangular grey lesions", "Lesions parallel to veins", "Premature leaf death", "Reduced photosynthesis"], treatment: ["Fungicide application", "Crop rotation with non-grass crops", "Remove infected residues", "Use resistant hybrids"] },
    
    { id: "r0", name: "Rice Healthy", pathogen: "None", type: "Healthy", severity: "None", crops: ["Rice"], prevalence: 0, symptoms: ["Green foliage", "Normal tiller development", "Vigorous panicles", "No visible lesions"], treatment: ["Maintain proper water management", "Monitor for pest presence", "Apply balanced fertilization", "Continue disease surveillance"] },
    { id: "r1", name: "Bacterial Blight in Rice", pathogen: "Xanthomonas oryzae", type: "Bacterial", severity: "High", crops: ["Rice"], prevalence: 18, symptoms: ["Water-soaked leaf margins", "Yellowing from edges", "Bacterial exudate", "Leaf wilting"], treatment: ["Use resistant varieties", "Avoid flood irrigation", "Copper hydroxide spray", "Proper field management"] },
    { id: "r2", name: "Rice Blast", pathogen: "Magnaporthe oryzae", type: "Fungal", severity: "High", crops: ["Rice"], prevalence: 17, symptoms: ["Brown lesions on leaves", "Diamond-shaped blast on neck", "White center with red border", "Grain loss"], treatment: ["Fungicide application", "Use resistant varieties", "Avoid excessive nitrogen", "Improve drainage"] },
    { id: "r3", name: "Rice Leaf Curl", pathogen: "Rice Leaf Curl Virus", type: "Viral", severity: "Medium", crops: ["Rice"], prevalence: 12, symptoms: ["Upward leaf curling", "Yellowing of leaves", "Stunted plant growth", "Reduced tillering"], treatment: ["Use virus-resistant varieties", "Control insect vectors", "Remove infected plants", "Maintain field sanitation"] },
    
    { id: "c0", name: "Healthy Cotton", pathogen: "None", type: "Healthy", severity: "None", crops: ["Cotton"], prevalence: 0, symptoms: ["Green foliage", "Vigorous boll development", "Normal flowering", "No visible damage"], treatment: ["Continue regular monitoring", "Maintain irrigation schedule", "Apply preventive pest management", "Monitor for disease symptoms"] },
    { id: "c1", name: "Cotton Aphid", pathogen: "Aphis gossypii", type: "Pest", severity: "Medium", crops: ["Cotton"], prevalence: 12, symptoms: ["Yellowing of foliage", "Honeydew on plants", "Stunted growth", "Curled or distorted leaves"], treatment: ["Insecticidal spray", "Encourage natural predators", "Proper crop irrigation", "Monitor early season"] },
    { id: "c2", name: "Bollrot on Cotton", pathogen: "Aspirogillus flavus", type: "Fungal", severity: "High", crops: ["Cotton"], prevalence: 14, symptoms: ["Boll rot and decay", "Black fuzzy mold on bolls", "Seed discoloration", "Reduced fiber quality"], treatment: ["Fungicide application", "Improve field drainage", "Harvest at right time", "Proper storage of seeds"] },
    { id: "c3", name: "Cotton Mealy Bug", pathogen: "Planococcus lilacinus", type: "Pest", severity: "Medium", crops: ["Cotton"], prevalence: 11, symptoms: ["Waxy white coating on plants", "Honeydew and sooty mold", "Stunted growth", "Reduced boll size"], treatment: ["Insecticide spray", "Biological control", "Remove affected plant parts", "Monitor regularly"] },
    { id: "c4", name: "Red Cotton Bug", pathogen: "Dysdercus koenigii", type: "Pest", severity: "High", crops: ["Cotton"], prevalence: 13, symptoms: ["Red discoloration on bolls", "Wilting of plant parts", "Staining of fibers", "Boll puncture wounds"], treatment: ["Insecticide application", "Field sanitation", "Remove alternate host plants", "Timely harvesting"] },
    { id: "c5", name: "Cotton Whitefly", pathogen: "Bemisia tabaci", type: "Pest", severity: "Medium", crops: ["Cotton"], prevalence: 12, symptoms: ["Yellow stippling on leaves", "Honeydew and sooty mold", "Transmission of viruses", "Leaf yellowing"], treatment: ["Insecticide spray", "Yellow sticky traps", "Control weeds", "Use resistant varieties"] },
    { id: "c6", name: "Pink Bollworm in Cotton", pathogen: "Pectinophora gossypiella", type: "Pest", severity: "High", crops: ["Cotton"], prevalence: 15, symptoms: ["Entry holes in bolls", "Pink larvae inside bolls", "High seed damage", "Poor lint quality"], treatment: ["Insecticide at boll stage", "Remove alternate hosts", "Field sanitation", "Use resistant varieties"] },
    { id: "c7", name: "Thrips on Cotton", pathogen: "Thrips species", type: "Pest", severity: "Medium", crops: ["Cotton"], prevalence: 10, symptoms: ["Stippled leaves", "Silvery patches on leaves", "Deformation of new growth", "Reduced leaf area"], treatment: ["Insecticide spray", "Cultural control measures", "Monitor early stages", "Remove affected leaves"] },
    { id: "c8", name: "Anthracnose on Cotton", pathogen: "Colletotrichum species", type: "Fungal", severity: "Medium", crops: ["Cotton"], prevalence: 9, symptoms: ["Brown lesions on bolls", "Leaf spots with rings", "Boll rot", "Reduced yield"], treatment: ["Fungicide application", "Avoid wounding plants", "Proper field sanitation", "Crop rotation"] },
    { id: "c9", name: "American Bollworm on Cotton", pathogen: "Helicoverpa armigera", type: "Pest", severity: "High", crops: ["Cotton"], prevalence: 16, symptoms: ["Boll damage", "Larva inside bolls", "Poor fiber development", "High fruit loss"], treatment: ["Insecticide spray", "Pheromone traps", "Remove alternate hosts", "Timely intervention"] },
    { id: "c10", name: "Bollworm on Cotton", pathogen: "Earias species", type: "Pest", severity: "High", crops: ["Cotton"], prevalence: 14, symptoms: ["Boll entry holes", "Green larvae in bolls", "Boll shedding", "Reduced seed cotton"], treatment: ["Insecticide application", "Biological control agents", "Field sanitation", "Timely monitoring"] },
    { id: "c11", name: "Bacterial Blight in Cotton", pathogen: "Xanthomonas campestris", type: "Bacterial", severity: "Medium", crops: ["Cotton"], prevalence: 10, symptoms: ["Angular water-soaked lesions", "Yellowing of affected tissue", "Leaf spots with red halos", "Defoliation"], treatment: ["Use resistant varieties", "Avoid wounding plants", "Copper hydroxide spray", "Proper crop rotation"] },
    
    { id: "s0", name: "Sugarcane Healthy", pathogen: "None", type: "Healthy", severity: "None", crops: ["Sugarcane"], prevalence: 0, symptoms: ["Green foliage", "Vigorous stalk growth", "No visible lesions", "Healthy stalks"], treatment: ["Maintain proper irrigation", "Monitor for pest presence", "Apply balanced fertilization", "Continue disease surveillance"] },
    { id: "s1", name: "Tungro Sugarcane", pathogen: "Sugarcane Tungro Virus", type: "Viral", severity: "High", crops: ["Sugarcane"], prevalence: 14, symptoms: ["Yellow-orange discoloration of leaves", "Stunted plant growth", "Reduced stalk diameter", "Wilting of foliage"], treatment: ["Use virus-resistant varieties", "Control insect vectors (leafhoppers)", "Remove infected plants", "Maintain field sanitation"] },
    { id: "s2", name: "Mosaic Sugarcane", pathogen: "Sugarcane Mosaic Virus", type: "Viral", severity: "Medium", crops: ["Sugarcane"], prevalence: 12, symptoms: ["Mosaic pattern on leaves", "Light and dark green striping", "Leaf distortion", "Stunted growth"], treatment: ["Use resistant cultivars", "Control aphid vectors", "Remove infected stalks", "Proper crop rotation"] },
    { id: "s3", name: "Red Rust Sugarcane", pathogen: "Puccinia melanocephala", type: "Fungal", severity: "High", crops: ["Sugarcane"], prevalence: 13, symptoms: ["Orange-red pustules on leaves", "Severe leaf damage", "Reduced photosynthesis", "Lower sugar yield"], treatment: ["Use resistant varieties", "Avoid stress conditions", "Fungicide application if severe", "Maintain proper nutrition"] },
    { id: "s4", name: "Yellow Rust Sugarcane", pathogen: "Puccinia kuehnii", type: "Fungal", severity: "High", crops: ["Sugarcane"], prevalence: 13, symptoms: ["Yellow pustules on leaves", "Severe leaf yellowing", "Extensive leaf damage", "Reduced photosynthetic capacity"], treatment: ["Use resistant varieties", "Fungicide application", "Avoid stress conditions", "Maintain crop health"] },
    { id: "s5", name: "Red Rot Sugarcane", pathogen: "Colletotrichum falcatum", type: "Fungal", severity: "High", crops: ["Sugarcane"], prevalence: 12, symptoms: ["Red discoloration of internodes", "White fungal strands in vascular tissue", "Reduced juice quality", "Stunted growth"], treatment: ["Use resistant varieties", "Avoid mechanical damage to stalks", "Proper field sanitation", "Control stress conditions"] },
    
    { id: "o1", name: "Wilt Disease", pathogen: "Fusarium/Verticillium species", type: "Fungal", severity: "High", crops: ["Cotton", "Sugarcane", "Maize"], prevalence: 11, symptoms: ["Yellowing of foliage", "Wilting of leaves and stems", "Vascular discoloration", "Eventual plant death"], treatment: ["Use resistant varieties", "Proper soil sanitation", "Crop rotation with non-susceptible crops", "Irrigation management"] },
];

// State
let currentPage = 'dashboard';
let selectedFile  = null;   // single-file mode
let selectedFiles = [];     // multi-file upload queue
let capturedFiles = [];     // camera multi-capture queue
let charts = {};

// ─── Scan History (localStorage) ─────────────────────────────────────────────
const HISTORY_KEY = 'cropai_scan_history';

function getScanHistory() {
    try {
        return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    } catch { return []; }
}

function saveScanResult(result) {
    const history = getScanHistory();
    history.unshift({
        timestamp:  new Date().toISOString(),
        imageName:  result.image_name || result.imageName || '',
        crop:       result.crop,
        disease:    result.disease,
        confidence: result.confidence,
        severity:   result.severity
    });
    // Keep at most 200 records
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 200)));
}

function loadDashboardData() {
    const history = getScanHistory();
    const total   = history.length;
    const healthy = history.filter(r => r.severity === 'None').length;
    const diseased = total - healthy;
    const avgConf = total ? Math.round(history.reduce((s, r) => s + (r.confidence || 0), 0) / total * 100) : 0;

    // Stat cards
    const setVal = (sel, val) => { const el = document.querySelector(sel); if (el) el.textContent = val; };
    setVal('.stat-card:nth-child(1) .stat-value', total);
    setVal('.stat-card:nth-child(2) .stat-value', diseased);
    setVal('.stat-card:nth-child(3) .stat-value', healthy);
    setVal('.stat-card:nth-child(4) .stat-value', total ? avgConf + '%' : '0%');

    // Recent detections table
    const tbody = document.getElementById('detectionsTableBody');
    if (tbody) {
        if (history.length === 0) {
            tbody.innerHTML = '<tr id="emptyTableRow"><td colspan="6" style="text-align:center;padding:24px;color:#9ca3af;">No detection data yet. Analyze an image to see results here.</td></tr>';
        } else {
            tbody.innerHTML = history.slice(0, 20).map(r => {
                const ts = new Date(r.timestamp).toLocaleString();
                const sevColor = r.severity === 'High' ? '#fef2f2' : r.severity === 'Medium' ? '#fffbeb' : '#f0fdf4';
                const status = r.severity === 'None' ? 'Healthy' : 'Disease Detected';
                return `<tr>
                    <td style="font-size:13px;">${ts}</td>
                    <td style="text-transform:capitalize;">${r.crop}</td>
                    <td>${r.disease}</td>
                    <td>${(r.confidence * 100).toFixed(1)}%</td>
                    <td><span style="background:${sevColor};padding:2px 8px;border-radius:4px;font-size:12px;">${r.severity || 'Unknown'}</span></td>
                    <td style="font-size:12px;color:#6b7280;">${status}</td>
                </tr>`;
            }).join('');
        }
    }

    // Detection trend — count scans per day for last 7 days
    if (charts.detection) {
        const days = [];
        const counts = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date(); d.setDate(d.getDate() - i);
            const label = d.toLocaleDateString('en', {weekday: 'short'});
            const dateStr = d.toISOString().slice(0, 10);
            days.push(label);
            counts.push(history.filter(r => r.timestamp.startsWith(dateStr)).length);
        }
        charts.detection.data.labels = days;
        charts.detection.data.datasets[0].data = counts;
        charts.detection.options.plugins.tooltip.callbacks.afterLabel = () => '';
        charts.detection.update();
    }

    // Scans by crop chart
    if (charts.crop) {
        const crops = ['wheat', 'maize', 'rice', 'cotton', 'sugarcane'];
        charts.crop.data.datasets[0].data = crops.map(c =>
            history.filter(r => (r.crop || '').toLowerCase() === c).length
        );
        charts.crop.update();
    }

    // Severity breakdown chart
    if (charts.severity) {
        charts.severity.data.datasets[0].data = [
            history.filter(r => r.severity === 'High').length,
            history.filter(r => r.severity === 'Medium').length,
            history.filter(r => r.severity === 'Low').length,
            history.filter(r => r.severity === 'None').length
        ];
        charts.severity.update();
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeFileUpload();
    initializeCameraCapture();
    initializeCharts();
    initializeDiseaseLibrary();
    initializeSettings();
    initializePageTitles();
    updateSidebarModelStatus();
    loadDashboardData();  // Populate dashboard from stored history
});

// Update sidebar model status
function updateSidebarModelStatus() {
    fetch('/api/health')
        .then(response => response.json())
        .then(data => {
            const modelCount = data.models_loaded || 0;
            const totalModels = 2;
            const statusText = modelCount > 0 ? 'Active' : 'Ready';
            
            document.getElementById('status-text').textContent = statusText;
            document.getElementById('model-count').textContent = `${modelCount}/${totalModels} Models`;
            document.getElementById('model-info').textContent = 'MobileNetV2 fine-tuned, 40 classes';
        })
        .catch(() => {
            document.getElementById('status-text').textContent = 'Ready';
            document.getElementById('model-count').textContent = '0/2 Models';
            document.getElementById('model-info').textContent = 'Initializing...';
        });
    
    // Update every 5 seconds
    setInterval(() => {
        fetch('/api/health')
            .then(response => response.json())
            .then(data => {
                const modelCount = data.models_loaded || 0;
                document.getElementById('model-count').textContent = `${modelCount}/2 Models`;
            })
            .catch(() => {});
    }, 5000);
}

// Navigation
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const pageId = item.dataset.page;
            activatePage(pageId, item);
        });
    });
}

function activatePage(pageId, navItem) {
    currentPage = pageId;

    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    if (navItem) navItem.classList.add('active');

    document.querySelectorAll('.page').forEach(page => page.style.display = 'none');
    document.getElementById(pageId + '-page').style.display = 'block';

    updatePageHeader(pageId);

    if (pageId === 'dashboard' && Object.keys(charts).length === 0) {
        setTimeout(() => initializeCharts(), 100);
    }
}

function updatePageHeader(pageId) {
    const titles = {
        'dashboard': { title: 'Dashboard', subtitle: 'Crop Disease Recognizer — March 2026' },
        'scan': { title: 'New Scan', subtitle: 'Upload and analyze a crop image' },
        'diseases': { title: 'Disease Library', subtitle: 'Reference database of crop diseases' },
        'settings': { title: 'Settings', subtitle: 'Model, notifications & display preferences' }
    };

    const header = titles[pageId] || titles.dashboard;
    document.querySelector('.page-title').textContent = header.title;
    document.querySelector('.page-subtitle').textContent = header.subtitle;
}

// Page Titles
function initializePageTitles() {
    const pageHeaderBtn = document.querySelector('.btn-upload');
    pageHeaderBtn.addEventListener('click', () => {
        activatePage('scan', document.querySelector('[data-page="scan"]'));
    });
}

function initializeFileUpload() {
    const uploadZone  = document.getElementById('uploadZone');
    const fileInput   = document.getElementById('fileInput');
    const analyzeBtn  = document.getElementById('analyzeBtn');
    const batchBtn    = document.getElementById('analyzeBatchBtn');
    const clearBtn    = document.getElementById('clearBtn');

    uploadZone.addEventListener('click', () => fileInput.click());

    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.classList.add('dragover');
    });

    uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('dragover'));

    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) handleFilesSelect(Array.from(e.dataTransfer.files));
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) handleFilesSelect(Array.from(e.target.files));
    });

    analyzeBtn.addEventListener('click', analyzeImage);
    batchBtn.addEventListener('click', analyzeBatch);

    clearBtn.addEventListener('click', () => {
        selectedFile  = null;
        selectedFiles = [];
        capturedFiles = [];
        fileInput.value = '';
        document.getElementById('fileQueue').style.display             = 'none';
        document.getElementById('fileQueue').innerHTML                 = '';
        const cq = document.getElementById('cameraQueue');
        if (cq) { cq.style.display = 'none'; cq.innerHTML = ''; }
        document.getElementById('previewSection').style.display        = 'none';
        document.getElementById('cameraCaptureSection').style.display  = 'none';
        document.getElementById('analysisResult').style.display        = 'none';
        document.getElementById('analyzeBtn').style.display            = 'none';
        document.getElementById('analyzeBatchBtn').style.display       = 'none';
        document.getElementById('clearBtn').style.display              = 'none';
    });
}

function handleFilesSelect(files) {
    const valid = files.filter(f => {
        if (!f.type.startsWith('image/')) { showError(`${f.name} is not a valid image`); return false; }
        if (f.size > 16 * 1024 * 1024)   { showError(`${f.name} exceeds 16MB`);        return false; }
        return true;
    });
    if (!valid.length) return;

    if (valid.length === 1) {
        // Single file — use existing single-preview flow
        selectedFile  = valid[0];
        selectedFiles = [];
        document.getElementById('fileQueue').style.display       = 'none';
        document.getElementById('analyzeBatchBtn').style.display = 'none';

        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById('previewSection').style.display = 'block';
            document.getElementById('previewImage').src             = e.target.result;
            document.getElementById('fileName').textContent         = valid[0].name;
            document.getElementById('fileSize').textContent         = `Size: ${(valid[0].size / 1024).toFixed(2)} KB`;
            document.getElementById('analyzeBtn').style.display     = 'inline-block';
            document.getElementById('clearBtn').style.display       = 'inline-block';
        };
        reader.readAsDataURL(valid[0]);
    } else {
        // Multiple files — show queue
        selectedFile  = null;
        selectedFiles = valid;
        document.getElementById('previewSection').style.display    = 'none';
        document.getElementById('analyzeBtn').style.display        = 'none';
        document.getElementById('analyzeBatchBtn').style.display   = 'inline-block';
        document.getElementById('clearBtn').style.display          = 'inline-block';
        renderFileQueue();
    }
}

function renderFileQueue() {
    const queueDiv = document.getElementById('fileQueue');
    queueDiv.style.display = 'flex';
    queueDiv.innerHTML = `<div class="queue-count">${selectedFiles.length} images selected</div>`
        + selectedFiles.map((f, i) => {
            const url = URL.createObjectURL(f);
            return `<div class="queue-item" id="qitem-${i}">
                <img src="${url}" alt="${f.name}">
                <span class="q-status" id="qstatus-${i}"></span>
                <p class="q-name">${f.name}</p>
            </div>`;
        }).join('');
}

function renderCameraQueue() {
    const queueDiv = document.getElementById('cameraQueue');
    if (!queueDiv) return;
    queueDiv.style.display = 'flex';
    queueDiv.innerHTML = `<div class="queue-count">${capturedFiles.length} photo${capturedFiles.length !== 1 ? 's' : ''} captured</div>`
        + capturedFiles.map((f, i) => {
            const url = URL.createObjectURL(f);
            return `<div class="queue-item" id="cqitem-${i}">
                <img src="${url}" alt="Photo ${i + 1}">
                <span class="q-status" id="cqstatus-${i}"></span>
                <p class="q-name">Photo ${i + 1}</p>
            </div>`;
        }).join('');
}

function handleFileSelect(file) {           // kept for camera capture compatibility
    handleFilesSelect([file]);
}

// Camera Capture
function initializeCameraCapture() {
    const uploadTabBtn = document.getElementById('uploadTabBtn');
    const cameraTabBtn = document.getElementById('cameraTabBtn');
    const uploadMode = document.getElementById('uploadMode');
    const cameraMode = document.getElementById('cameraMode');
    const toggleCameraBtn = document.getElementById('toggleCameraBtn');
    const captureBtn = document.getElementById('captureBtn');
    const cameraStream = document.getElementById('cameraStream');
    const captureCanvas = document.getElementById('captureCanvas');

    let isCameraActive = false;
    let mediaStream = null;

    // Validate all required elements exist
    if (!uploadTabBtn) {
        console.error('❌ uploadTabBtn not found');
        return;
    }
    if (!cameraTabBtn) {
        console.error('❌ cameraTabBtn not found');
        return;
    }
    if (!toggleCameraBtn) {
        console.error('❌ toggleCameraBtn not found');
        return;
    }

    console.log('✓ Camera elements found, initializing...');

    // Tab switching
    uploadTabBtn.addEventListener('click', () => {
        console.log('Upload tab clicked');
        uploadTabBtn.classList.add('active');
        cameraTabBtn.classList.remove('active');
        uploadMode.classList.add('active');
        cameraMode.classList.remove('active');
        if (isCameraActive) stopCamera();
    });

    cameraTabBtn.addEventListener('click', () => {
        console.log('Camera tab clicked');
        cameraTabBtn.classList.add('active');
        uploadTabBtn.classList.remove('active');
        cameraMode.classList.add('active');
        uploadMode.classList.remove('active');
    });

    // Camera access
    toggleCameraBtn.addEventListener('click', async () => {
        console.log('Toggle camera button clicked, current state:', isCameraActive);
        if (isCameraActive) {
            stopCamera();
        } else {
            await startCamera();
        }
    });

    // Capture photo
    if (captureBtn) {
        captureBtn.addEventListener('click', () => {
            console.log('Capture button clicked');
            if (isCameraActive && mediaStream) {
                capturePhoto(cameraStream, captureCanvas);
            } else {
                console.warn('Camera not active or no media stream');
            }
        });
    }

    async function startCamera() {
        try {
            console.log('Attempting to start camera...');
            
            let stream = null;
            
            // Try with constraints first
            try {
                console.log('Trying with environment facing camera...');
                stream = await navigator.mediaDevices.getUserMedia({
                    video: { 
                        facingMode: 'environment',
                        width: { ideal: 1280 }, 
                        height: { ideal: 720 } 
                    },
                    audio: false
                });
                console.log('✓ Environment camera access granted');
            } catch (err) {
                console.warn('Environment camera failed, trying default...');
                // Try with user-facing camera (laptop webcam)
                try {
                    stream = await navigator.mediaDevices.getUserMedia({
                        video: { 
                            facingMode: 'user'
                        },
                        audio: false
                    });
                    console.log('✓ User camera access granted');
                } catch (err2) {
                    console.warn('User camera failed, trying any camera...');
                    // Last resort: any camera without constraints
                    stream = await navigator.mediaDevices.getUserMedia({
                        video: true,
                        audio: false
                    });
                    console.log('✓ Default camera access granted');
                }
            }

            if (!stream) {
                throw new Error('No camera stream obtained');
            }

            mediaStream = stream;
            cameraStream.srcObject = mediaStream;
            
            // Wait for video metadata
            cameraStream.onloadedmetadata = function() {
                console.log('Video metadata loaded, playing...');
                cameraStream.play().catch(e => console.error('Play error:', e));
            };
            
            // Fallback: play immediately
            setTimeout(() => {
                if (cameraStream.paused) {
                    cameraStream.play().catch(e => console.error('Delayed play error:', e));
                }
            }, 500);
            
            isCameraActive = true;
            toggleCameraBtn.textContent = '⏹ Stop Camera';
            toggleCameraBtn.classList.add('btn-danger');
            toggleCameraBtn.classList.remove('btn-secondary');
            if (captureBtn) {
                captureBtn.style.display = 'inline-block';
            }
            
            console.log('✓ Camera started successfully');
            
        } catch (error) {
            console.error('❌ Camera error:', error);
            isCameraActive = false;
            
            let errorMsg = 'Unable to access camera. ';
            if (error.name === 'NotAllowedError') {
                errorMsg += 'Camera permission DENIED. Please grant camera access in your browser settings, then reload the page.';
            } else if (error.name === 'NotFoundError') {
                errorMsg += 'No camera device found on this device.';
            } else if (error.name === 'NotReadableError') {
                errorMsg += 'Camera is in use by another application. Close other apps using the camera and try again.';
            } else {
                errorMsg += error.message || 'Unknown error occurred.';
            }
            
            showError(errorMsg);
        }
    }

    function stopCamera() {
        console.log('Stopping camera...');
        if (mediaStream) {
            mediaStream.getTracks().forEach(track => {
                track.stop();
                console.log('Stopped track:', track.kind);
            });
            mediaStream = null;
        }
        cameraStream.srcObject = null;
        isCameraActive = false;
        toggleCameraBtn.textContent = '▶ Start Camera';
        toggleCameraBtn.classList.remove('btn-danger');
        toggleCameraBtn.classList.add('btn-secondary');
        if (captureBtn) captureBtn.style.display = 'none';
        console.log('✓ Camera stopped');
    }

    function capturePhoto(video, canvas) {
        console.log('Capturing photo... Video dimensions:', video.videoWidth, 'x', video.videoHeight);
        
        if (video.videoWidth === 0 || video.videoHeight === 0) {
            console.error('❌ Video not ready - invalid dimensions');
            showError('Camera video not ready. Please try again.');
            return;
        }

        const ctx = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);
        
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        canvas.toBlob((blob) => {
            if (blob) {
                const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -2);
                const capturedFile = new File([blob], `camera-capture-${timestamp}.jpg`, { type: 'image/jpeg' });
                capturedFiles.push(capturedFile);
                selectedFiles = [...capturedFiles];
                selectedFile  = null;

                const preview = document.getElementById('cameraCaptureSection');
                const capturedImg = document.getElementById('capturedImage');
                if (preview && capturedImg) {
                    capturedImg.src = dataUrl;
                    preview.style.display = 'block';
                }
                renderCameraQueue();
                document.getElementById('analyzeBatchBtn').style.display = 'inline-block';
                document.getElementById('clearBtn').style.display = 'inline-block';
                console.log(`✓ Photo captured. Total: ${capturedFiles.length}`);
            } else {
                console.error('❌ Failed to create blob');
                showError('Failed to capture photo. Please try again.');
            }
        }, 'image/jpeg', 0.9);
    }
    
    console.log('✓ Camera capture initialized');
}

function buildResultHTML(data) {
    const heatmapHTML = data.heatmap ? `
        <div style="margin-bottom:16px;">
            <h4 style="margin:0 0 8px 0;font-size:14px;font-weight:600;">Grad-CAM Heatmap</h4>
            <img src="${data.heatmap}" style="max-width:100%;height:auto;border-radius:8px;border:1px solid #e5e7eb;" alt="Heatmap">
            <p style="margin:4px 0 0 0;font-size:12px;color:#6b7280;"><em>Red areas indicate high disease probability regions.</em></p>
        </div>` : '';
    return `
        <div style="background:#f9fafb;padding:12px;border-radius:8px;margin-bottom:16px;">
            <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
                <strong style="font-size:16px;">${data.disease}</strong>
                <span style="background:${getSeverityColor(data.severity)};padding:4px 8px;border-radius:6px;font-size:12px;">${data.severity}</span>
            </div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
                <span style="font-weight:600;">Confidence: ${(data.confidence*100).toFixed(1)}%</span>
                <div style="flex:1;height:4px;background:#e5e7eb;border-radius:2px;overflow:hidden;">
                    <div style="width:${data.confidence*100}%;height:100%;background:linear-gradient(90deg,#10b981,#059669);"></div>
                </div>
            </div>
            <div style="font-size:12px;color:#6b7280;">
                <strong>Crop:</strong> ${data.crop} | <strong>Pathogen:</strong> ${data.pathogen}
            </div>
        </div>
        ${heatmapHTML}
        <div style="margin-bottom:16px;">
            <h4 style="margin:0 0 8px 0;font-size:14px;font-weight:600;">Description</h4>
            <p style="margin:0;font-size:14px;color:#6b7280;">${data.description}</p>
        </div>
        <div>
            <h4 style="margin:0 0 8px 0;font-size:14px;font-weight:600;">Recommendations</h4>
            <ul style="margin:0;padding-left:20px;font-size:13px;color:#6b7280;">
                ${data.recommendations.map(r => `<li>${r}</li>`).join('')}
            </ul>
        </div>`;
}

function callDetectAPI(file, threshold) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('threshold', threshold);
    return fetch('/api/detect', { method: 'POST', body: formData }).then(r => r.json());
}

function analyzeImage() {
    const resultDiv = document.getElementById('analysisResult');
    resultDiv.innerHTML = '<div class="loader"></div><p style="text-align:center;margin-top:12px;">Analyzing image...</p>';
    resultDiv.classList.remove('success', 'error');
    resultDiv.classList.add('loading');
    resultDiv.style.display = 'block';

    const threshold = localStorage.getItem('confidenceThreshold') || '0.65';

    callDetectAPI(selectedFile, threshold)
    .then(data => {
        if (data.error) { showError(data.error); return; }
        saveScanResult(data);
        loadDashboardData();
        resultDiv.innerHTML = `
            <div style="margin-bottom:16px;">
                <h3 style="margin:0 0 4px 0;font-size:18px;">Analysis Complete</h3>
                <p style="margin:0;color:#6b7280;font-size:14px;">Image analyzed successfully</p>
            </div>
            ${buildResultHTML(data)}`;
        resultDiv.classList.remove('loading');
        resultDiv.classList.add('success');
    })
    .catch(() => showError('Failed to analyze image. Please try again.'));
}

async function analyzeBatch() {
    if (!selectedFiles.length) return;
    const threshold = localStorage.getItem('confidenceThreshold') || '0.65';
    const resultDiv  = document.getElementById('analysisResult');
    const batchBtn   = document.getElementById('analyzeBatchBtn');

    batchBtn.disabled    = true;
    batchBtn.textContent = 'Analyzing...';
    resultDiv.innerHTML  = '';
    resultDiv.style.display = 'block';
    resultDiv.classList.remove('success', 'error', 'loading');

    for (let i = 0; i < selectedFiles.length; i++) {
        const file    = selectedFiles[i];
        const imgEl   = document.querySelector(`#qitem-${i} img`);
        const statusEl = document.getElementById(`qstatus-${i}`);

        if (imgEl)   imgEl.className   = 'analyzing';
        if (statusEl) statusEl.textContent = '...';

        // Add a placeholder row
        const rowId = `brow-${i}`;
        const placeholder = document.createElement('div');
        placeholder.className = 'batch-result-item';
        placeholder.id = rowId;
        placeholder.innerHTML = `<strong>${file.name}</strong> <span style="color:#9ca3af;">Analyzing...</span>`;
        resultDiv.appendChild(placeholder);

        try {
            const data = await callDetectAPI(file, threshold);
            const row  = document.getElementById(rowId);
            if (data.error) {
                if (imgEl)   imgEl.className   = 'error-img';
                if (statusEl) statusEl.textContent = 'x';
                row.className = 'batch-result-item error';
                row.innerHTML = `<strong>${file.name}</strong><br><span style="color:#ef4444;">${data.error}</span>`;
            } else {
                saveScanResult(data);
                if (imgEl)   imgEl.className   = 'done';
                if (statusEl) statusEl.textContent = 'v';
                row.className = 'batch-result-item success';
                row.innerHTML = `<strong>${file.name}</strong> &mdash; ${data.disease} (${(data.confidence*100).toFixed(1)}%)
                    ${buildResultHTML(data)}`;
            }
        } catch (err) {
            const row = document.getElementById(rowId);
            if (imgEl)    imgEl.className   = 'error-img';
            if (statusEl) statusEl.textContent = 'x';
            row.className = 'batch-result-item error';
            row.innerHTML = `<strong>${file.name}</strong><br><span style="color:#ef4444;">Request failed</span>`;
        }
    }

    loadDashboardData();
    batchBtn.disabled    = false;
    batchBtn.textContent = 'Analyze All Images';
}

function getSeverityColor(severity) {
    const colors = {
        'High': '#fee2e2',
        'Medium': '#fef3c7',
        'Low': '#dcfce7',
        'None': '#dcfce7'
    };
    return colors[severity] || '#dcfce7';
}

// Charts
function initializeCharts() {
    // Detection Trend Chart
    const detectionCtx = document.getElementById('detectionChart')?.getContext('2d');
    if (detectionCtx) {
        charts.detection = new Chart(detectionCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Detections',
                    data: [0, 0, 0, 0, 0, 0, 0],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#10b981',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            afterLabel: () => 'Data will load after model integration'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { color: '#9ca3af' },
                        grid: { color: '#f3f4f6' }
                    },
                    x: {
                        ticks: { color: '#9ca3af' },
                        grid: { display: false }
                    }
                }
            }
        });
    }

    // Scans by Crop Chart
    const cropCtx = document.getElementById('cropChart')?.getContext('2d');
    if (cropCtx) {
        charts.crop = new Chart(cropCtx, {
            type: 'bar',
            data: {
                labels: ['Wheat', 'Maize', 'Rice', 'Cotton', 'Sugarcane'],
                datasets: [{
                    label: 'Scans',
                    data: [0, 0, 0, 0, 0],
                    backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
                    borderRadius: 6,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, ticks: { color: '#9ca3af' }, grid: { color: '#f3f4f6' } },
                    x: { ticks: { color: '#9ca3af' }, grid: { display: false } }
                }
            }
        });
    }

    // Severity Breakdown Chart
    const severityCtx = document.getElementById('severityChart')?.getContext('2d');
    if (severityCtx) {
        charts.severity = new Chart(severityCtx, {
            type: 'bar',
            data: {
                labels: ['High', 'Medium', 'Low', 'Healthy'],
                datasets: [{
                    label: 'Count',
                    data: [0, 0, 0, 0],
                    backgroundColor: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6'],
                    borderRadius: 6,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, ticks: { color: '#9ca3af' }, grid: { color: '#f3f4f6' } },
                    x: { ticks: { color: '#9ca3af' }, grid: { display: false } }
                }
            }
        });
    }
}

// Disease Library
function initializeDiseaseLibrary() {
    const searchInput = document.getElementById('diseaseSearch');
    const cropFilter = document.getElementById('cropFilter');
    const diseasesList = document.getElementById('diseasesList');
    const diseaseDetails = document.getElementById('diseaseDetails');
    const closeDetailsBtn = document.querySelector('.close-details');

    function renderDiseases() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCrop = cropFilter.value;

        const filtered = diseasesDatabase.filter(disease => {
            const matchSearch = disease.name.toLowerCase().includes(searchTerm) ||
                disease.pathogen.toLowerCase().includes(searchTerm);
            const matchCrop = selectedCrop === 'All Crops' || disease.crops.includes(selectedCrop);
            return matchSearch && matchCrop;
        });

        diseasesList.innerHTML = filtered.map(disease => `
            <div class="disease-item" data-id="${disease.id}">
                <p class="disease-name">${disease.name}</p>
                <p class="disease-pathogen">${disease.pathogen}</p>
            </div>
        `).join('');

        diseasesList.querySelectorAll('.disease-item').forEach(item => {
            item.addEventListener('click', () => {
                diseasesList.querySelectorAll('.disease-item').forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                
                const diseaseId = item.dataset.id;
                const disease = diseasesDatabase.find(d => d.id === diseaseId);
                showDiseaseDetails(disease);
            });
        });
    }

    function showDiseaseDetails(disease) {
        diseaseDetails.innerHTML = `
            <div>
                <h2 style="margin: 0 0 8px 0; font-size: 20px;">${disease.name}</h2>
                <div style="margin-bottom: 16px;">
                    <span class="disease-severity-badge ${disease.severity}">${disease.severity}</span>
                </div>

                <div class="disease-section">
                    <h4>Pathogen</h4>
                    <p style="margin: 0; color: #6b7280;">${disease.pathogen}</p>
                </div>

                <div class="disease-section">
                    <h4>Affected Crops</h4>
                    <p style="margin: 0; color: #6b7280;">${disease.crops.join(', ')}</p>
                </div>

                <div class="disease-section">
                    <h4>Detection Prevalence</h4>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <div style="flex: 1; height: 6px; background: #e5e7eb; border-radius: 3px; overflow: hidden;">
                            <div style="width: ${disease.prevalence}%; height: 100%; background: linear-gradient(90deg, #10b981, #059669);"></div>
                        </div>
                        <span style="font-weight: 600;">${disease.prevalence}%</span>
                    </div>
                </div>

                <div class="disease-section">
                    <h4>Symptoms</h4>
                    <ul style="margin: 0; padding-left: 20px;">
                        ${disease.symptoms.map(s => `<li>${s}</li>`).join('')}
                    </ul>
                </div>

                <div class="disease-section">
                    <h4>Treatment & Management</h4>
                    <ul style="margin: 0; padding-left: 20px;">
                        ${disease.treatment.map(t => `<li>${t}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
        diseaseDetails.style.display = 'block';
    }

    searchInput.addEventListener('input', renderDiseases);
    cropFilter.addEventListener('change', renderDiseases);
    closeDetailsBtn.addEventListener('click', () => {
        diseaseDetails.style.display = 'none';
        diseasesList.querySelectorAll('.disease-item').forEach(i => i.classList.remove('active'));
    });

    renderDiseases();
}

function initializeSettings() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;
            
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(tabName + '-tab').classList.add('active');

            // Load model status when Model tab is clicked
            if (tabName === 'model') {
                loadModelStatus();
            }
        });
    });

    // Confidence Threshold slider
    const thresholdSlider = document.getElementById('confidenceThreshold');
    if (thresholdSlider) {
        // Load saved threshold
        const savedThreshold = localStorage.getItem('confidenceThreshold');
        if (savedThreshold) {
            thresholdSlider.value = savedThreshold;
            document.getElementById('thresholdValue').textContent = Math.round(parseFloat(savedThreshold) * 100) + '%';
        }

        thresholdSlider.addEventListener('input', (e) => {
            const value = Math.round(parseFloat(e.target.value) * 100);
            document.getElementById('thresholdValue').textContent = value + '%';
        });
    }

    // Browser Notifications toggle
    const browserNotificationsCheckbox = document.getElementById('browserNotifications');
    if (browserNotificationsCheckbox) {
        browserNotificationsCheckbox.addEventListener('change', (e) => {
            localStorage.setItem('browserNotifications', e.target.checked);
        });
        const savedNotifications = localStorage.getItem('browserNotifications');
        if (savedNotifications !== null) {
            browserNotificationsCheckbox.checked = savedNotifications === 'true';
        }
    }


    // Save Settings button
    const saveBtn = document.getElementById('saveSettingsBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            // Save preferences to localStorage
            const notifications = document.getElementById('browserNotifications').checked;
            const threshold = document.getElementById('confidenceThreshold').value;
            
            localStorage.setItem('browserNotifications', notifications);
            localStorage.setItem('confidenceThreshold', threshold);
            
            // Show success message
            const originalText = saveBtn.textContent;
            saveBtn.textContent = '✓ Saved';
            setTimeout(() => {
                saveBtn.textContent = originalText;
            }, 2000);
        });
    }

    // Load model status on initial settings page view
    if (document.getElementById('model-tab').style.display !== 'none') {
        loadModelStatus();
    }
}

function loadModelStatus() {
    fetch('/api/health')
        .then(response => response.json())
        .then(data => {
            if (data.models_status) {
                // API now returns 'finetuned' and 'base' keys
                ['finetuned', 'base'].forEach(key => {
                    const el = document.getElementById(key + '-status');
                    if (el) {
                        const loaded = data.models_status[key] === 'loaded';
                        el.textContent = loaded ? 'v Loaded' : 'o Ready';
                        el.style.color  = loaded ? '#4caf50' : '#9e9e9e';
                    }
                });
            }
        })
        .catch(() => {
            ['finetuned', 'base'].forEach(key => {
                const el = document.getElementById(key + '-status');
                if (el) { el.textContent = 'o Ready'; el.style.color = '#9e9e9e'; }
            });
        });
}

// Error Handler
function showError(message) {
    const resultDiv = document.getElementById('analysisResult');
    resultDiv.innerHTML = `
        <div style="color: #d32f2f;">
            <strong>Error: ${message}</strong>
        </div>
    `;
    resultDiv.classList.add('error');
    resultDiv.style.display = 'block';
}
