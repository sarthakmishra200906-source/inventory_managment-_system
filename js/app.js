// ===========================
// SPA Router & State Management
// ===========================

/**
 * App State - Manages the current view and app state
 */
const appState = {
    currentView: 'dashboard',
    views: ['dashboard', 'inventory', 'sustainability'],
};

/**
 * View Templates
 */
const viewTemplates = {
    dashboard: `
        <div class="dashboard-view">
            <h2>Dashboard</h2>
            <div class="grid grid-3 gap-3 mt-3">
                <div class="card">
                    <div class="card-header">Total Items</div>
                    <div class="card-body">
                        <h3 style="color: #3498db;">1,234</h3>
                        <p class="text-muted">Active inventory items</p>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header">Low Stock</div>
                    <div class="card-body">
                        <h3 style="color: #f39c12;">45</h3>
                        <p class="text-muted">Items need restocking</p>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header">Out of Stock</div>
                    <div class="card-body">
                        <h3 style="color: #e74c3c;">12</h3>
                        <p class="text-muted">Items currently unavailable</p>
                    </div>
                </div>
            </div>
            <div class="card mt-3">
                <div class="card-header">Recent Activities</div>
                <div class="card-body">
                    <p class="text-muted">Last updated: <strong>${new Date().toLocaleString()}</strong></p>
                    <p class="mt-2">No recent activities to display.</p>
                </div>
            </div>
        </div>
    `,
    
    inventory: `
        <div class="inventory-view">
            <div class="flex-between mb-3">
                <h2>Inventory Management</h2>
                <button class="btn btn-primary">+ Add Item</button>
            </div>
            <div class="card">
                <div class="card-header">Inventory Items</div>
                <div class="card-body">
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="border-bottom: 2px solid #ddd;">
                                <th style="padding: 12px; text-align: left;">Item ID</th>
                                <th style="padding: 12px; text-align: left;">Item Name</th>
                                <th style="padding: 12px; text-align: left;">Quantity</th>
                                <th style="padding: 12px; text-align: left;">Status</th>
                                <th style="padding: 12px; text-align: left;">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="border-bottom: 1px solid #ddd;">
                                <td style="padding: 12px;">#001</td>
                                <td style="padding: 12px;">Widget A</td>
                                <td style="padding: 12px;">150</td>
                                <td style="padding: 12px;"><span class="text-success">In Stock</span></td>
                                <td style="padding: 12px;">
                                    <button class="btn btn-secondary" style="padding: 0.5rem 1rem; font-size: 0.9rem;">Edit</button>
                                </td>
                            </tr>
                            <tr style="border-bottom: 1px solid #ddd;">
                                <td style="padding: 12px;">#002</td>
                                <td style="padding: 12px;">Widget B</td>
                                <td style="padding: 12px;">8</td>
                                <td style="padding: 12px;"><span class="text-warning">Low Stock</span></td>
                                <td style="padding: 12px;">
                                    <button class="btn btn-secondary" style="padding: 0.5rem 1rem; font-size: 0.9rem;">Edit</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p class="text-muted mt-3">Showing 2 of 1,234 items</p>
                </div>
            </div>
        </div>
    `,
    
    sustainability: `
        <div class="sustainability-view">
            <h2>Sustainability Report</h2>
            <div class="grid grid-2 gap-3 mt-3">
                <div class="card">
                    <div class="card-header">Waste Reduction</div>
                    <div class="card-body">
                        <h3 style="color: #27ae60;">32%</h3>
                        <p class="text-muted">Reduction achieved this quarter</p>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header">Recycled Materials</div>
                    <div class="card-body">
                        <h3 style="color: #27ae60;">2,450 kg</h3>
                        <p class="text-muted">Materials recycled</p>
                    </div>
                </div>
            </div>
            <div class="card mt-3">
                <div class="card-header">Goals & Initiatives</div>
                <div class="card-body">
                    <ul style="margin-left: 20px;">
                        <li>Reduce packaging waste by 50% by 2025</li>
                        <li>Transition to sustainable suppliers</li>
                        <li>Implement carbon-neutral shipping</li>
                        <li>Increase recycling program participation</li>
                    </ul>
                </div>
            </div>
        </div>
    `,
};

// ===========================
// Router Functions
// ===========================

/**
 * Render a view based on viewName
 * @param {string} viewName - Name of the view to render
 */
function renderView(viewName) {
    // Validate view name
    if (!appState.views.includes(viewName)) {
        console.warn(`View "${viewName}" does not exist. Using dashboard.`);
        viewName = 'dashboard';
    }

    // Update state
    appState.currentView = viewName;

    // Get the app container
    const appContainer = document.getElementById('app');
    
    // Show loading spinner
    showLoadingSpinner();

    // Simulate async loading
    setTimeout(() => {
        // Clear previous content
        appContainer.innerHTML = '';

        // Inject the template
        appContainer.innerHTML = viewTemplates[viewName];

        // Update active nav link
        updateActiveNavLink(viewName);

        // Hide loading spinner
        hideLoadingSpinner();

        console.log(`Rendered view: ${viewName}`);
    }, 300); // Simulate network delay
}

/**
 * Update the active state of nav links
 * @param {string} viewName - Current view name
 */
function updateActiveNavLink(viewName) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.view === viewName) {
            link.classList.add('active');
        }
    });
}

/**
 * Show loading spinner
 */
function showLoadingSpinner() {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) {
        spinner.classList.remove('hidden');
    }
}

/**
 * Hide loading spinner
 */
function hideLoadingSpinner() {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) {
        spinner.classList.add('hidden');
    }
}

// ===========================
// Event Listeners
// ===========================

/**
 * Initialize navigation event listeners
 */
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const viewName = link.dataset.view;
            renderView(viewName);
        });
    });
}

// ===========================
// App Initialization
// ===========================

/**
 * Initialize the app
 */
function initApp() {
    console.log('Inventory Management System initialized');
    
    // Initialize navigation
    initNavigation();
    
    // Render default view
    renderView('dashboard');
    
    console.log('App ready!');
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);

// Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { renderView, initApp, appState };
}
