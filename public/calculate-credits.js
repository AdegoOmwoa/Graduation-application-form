document.addEventListener('DOMContentLoaded', (event) => {
    function calculateTotalCredits() {
        // Initialize total credit hours for each semester
        let totalFirstSem = 0;
        let totalSecondSem = 0;
        let totalInterSem = 0;

        // Calculate total for first semester
        document.querySelectorAll('input[name="credit_hours_first_sem[]"]').forEach(input => {
            totalFirstSem += (parseInt(input.value) || 0);
        });
        document.getElementById('first-semester-total').textContent = totalFirstSem;

        // Calculate total for second semester
        document.querySelectorAll('input[name="credit_hours_second_sem[]"]').forEach(input => {
            totalSecondSem += (parseInt(input.value) || 0);
        });
        document.getElementById('second-semester-total').textContent = totalSecondSem;

        // Calculate total for inter-semester
        document.querySelectorAll('input[name="credit_hours_inter_sem[]"]').forEach(input => {
            totalInterSem += (parseInt(input.value) || 0);
        });
        document.getElementById('inter-semester-total').textContent = totalInterSem;
    }

    // Attach event listener to all credit hour inputs
    document.querySelectorAll('.credit-hours').forEach(input => {
        input.addEventListener('input', calculateTotalCredits);
    });

    // Initial calculation on page load
    calculateTotalCredits();
});
