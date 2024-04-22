document.addEventListener('DOMContentLoaded', () => {

    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    const signbtns = document.getElementById("signbtns");

    // Function to manage visibility of sign-up/login buttons based on menu state and screen width
    function manageButtonVisibility() {
        if (window.innerWidth <= 1022) { // Assumes 768px is the breakpoint for mobile view
            if (document.getElementById('navbarBasicExample').classList.contains('is-active')) {
                signbtns.classList.remove('is-hidden'); // Show buttons when menu is active
            } else {
                signbtns.classList.add('is-hidden'); // Hide buttons when menu is not active
            }
        } else {
            signbtns.classList.add('is-hidden'); // Always hide buttons on larger screens
        }
    }

    $navbarBurgers.forEach(el => {
        el.addEventListener('click', () => {
            const target = el.dataset.target;
            const $target = document.getElementById(target);

            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle('is-active');
            $target.classList.toggle('is-active');

            // Manage visibility of sign buttons based on current menu state and screen width
            manageButtonVisibility();
        });
    });

    // Add event listener for resizing to adjust visibility based on screen width
    window.addEventListener('resize', manageButtonVisibility);
});