// script.js

// Mock Data for demonstration
const mockMembers = [
    { name: "John Doe", email: "john@example.com", startDate: "Jan 01, 2024", endDate: "Jan 01, 2025", pendingAmount: "50.00", status: "Active" },
    { name: "Jane Smith", email: "jane@example.com", startDate: "Feb 15, 2024", endDate: "Feb 15, 2025", pendingAmount: "0.00", status: "Active" },
    { name: "Mike Ross", email: "mike@example.com", startDate: "Mar 10, 2024", endDate: "Mar 10, 2025", pendingAmount: "120.00", status: "Inactive" },
    { name: "Rachel Zane", email: "rachel@example.com", startDate: "Dec 05, 2023", endDate: "Dec 05, 2024", pendingAmount: "0.00", status: "Active" },
    { name: "Harvey Specter", email: "harvey@example.com", startDate: "May 20, 2024", endDate: "May 20, 2025", pendingAmount: "250.00", status: "Active" }
];

// Function to populate the Member Table with optional filtering
function loadMemberData(filter = 'all') {
    const tableBody = document.getElementById('memberTableBody');
    const tableTitle = document.getElementById('tableTitle');
    if (!tableBody) return;

    let filteredData = mockMembers;
    let title = "All Members";

    if (filter === 'active') {
        filteredData = mockMembers.filter(m => m.status === 'Active');
        title = "Active Members";
    } else if (filter === 'pending') {
        filteredData = mockMembers.filter(m => parseFloat(m.pendingAmount) > 0);
        title = "Members with Pending Bills";
    } else if (filter === 'revenue') {
        filteredData = mockMembers.filter(m => parseFloat(m.pendingAmount) === 0);
        title = "Paid Members (Revenue Source)";
    }

    if (tableTitle) tableTitle.innerText = title;

    tableBody.innerHTML = ''; 
    filteredData.forEach((data) => {
        const row = `
            <tr>
                <td>${data.name}</td>
                <td>${data.email}</td>
                <td>${data.startDate}</td>
                <td>${data.endDate}</td>
                <td class="pending-amount">$${data.pendingAmount}</td>
                <td><span class="status-badge ${data.status.toLowerCase()}">${data.status}</span></td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Event Listeners for Stat Cards
function initCardFilters() {
    const cards = document.querySelectorAll('.stat-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove selected class from all
            cards.forEach(c => c.classList.remove('selected'));
            // Add selected class to clicked
            card.classList.add('selected');
            
            const filter = card.getAttribute('data-filter');
            loadMemberData(filter);
        });
    });
}

// Event Listeners for Admin Actions
const addMemberBtn = document.getElementById('addMemberBtn');
if (addMemberBtn) {
    addMemberBtn.addEventListener('click', () => {
        const name = prompt("Enter Member Name:");
        const email = prompt("Enter Member Email:");
        if (name && email) {
            alert(`Member ${name} added successfully! (Mock)`);
            mockMembers.push({
                name: name,
                email: email,
                startDate: new Date().toLocaleDateString(),
                endDate: "Next Year",
                pendingAmount: "0.00",
                status: "Active"
            });
            loadMemberData();
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadMemberData();
    initCardFilters();
});
