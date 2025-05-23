document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.tabLayoutButton').forEach((btn) => {
        const button = btn as HTMLButtonElement;
        button.addEventListener('click', () => {
            let layout = document.querySelector(`.tabLayout#${button.dataset.tabLayout}`) as HTMLDivElement;
            if (!layout) return;
            document.querySelectorAll('.tabLayout.active').forEach(el => (el as HTMLDivElement).style.display = 'none');
            layout.style.display = 'block';
        })
    })
})