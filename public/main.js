// ================= Profile Dropdown =================
document.getElementById('profileBtn').addEventListener('click', function () {
    let menu = document.getElementById('dropdownMenu');
    menu.style.display = (menu.style.display === 'flex') ? 'none' : 'flex';
    menu.style.flexDirection = 'column'; // make dropdown vertical
});

// Handle logout click
document.querySelector('#dropdownMenu a').addEventListener('click', function (e) {
    e.preventDefault(); // Stop default link behavior
    // Redirect to logout via PHP
    window.location.href = "main.php?logout=true";
});

// ================= Hover Effect for Tags =================
document.addEventListener('DOMContentLoaded', function() {
    const tags = document.querySelectorAll('.role-tag');
    
    tags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 5px 15px rgba(79, 70, 229, 0.2)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // ================= Role/Topic button click =================
    const roleTags = document.querySelectorAll('.role-tag'); // exclude custom
    roleTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // Get the button text (trim spaces/newlines)
            let role = this.innerText.trim();

            // Encode for safe URL
            role = encodeURIComponent(role);

            // Redirect to quiz1.html with role as query parameter
            window.location.href = `../quiz2page/quiz1.html?role=${role}`;
        });
    });
});

// ================= Custom Quiz Button =================
function goToQuiz() {
    // Use root-relative path; server serves /quizpage
    window.location.href = '/quizpage/quiz.html';
}

// ================= Force reload on back/forward safely =================
(function() {
    try {
        if (window.history && window.history.replaceState) {
            window.history.replaceState(null, null, window.location.href);
        }

        window.addEventListener('pageshow', function(event) {
            const perfEntries = window.performance ? window.performance.getEntriesByType("navigation") : [];
            const navType = perfEntries[0] ? perfEntries[0].type : null;

            if (event.persisted || navType === "back_forward") {
                // Force reload to trigger PHP session check
                window.location.href = window.location.href;
            }
        });
    } catch (e) {
        console.error("Back button reload error:", e);
    }
})();
