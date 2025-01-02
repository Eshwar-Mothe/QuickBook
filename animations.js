// navBar Expansion

const hamburger = document.getElementById('expand');
const showMenu = document.getElementById('show')
const closeMenu = document.getElementById('close');

const toggleMenu = () => {
    showMenu.classList.toggle('show');
    hamburger.classList.toggle('hide');
    closeMenu.classList.toggle('show');
}

hamburger.addEventListener('click', toggleMenu);
closeMenu.addEventListener('click', toggleMenu);

// Swapper Styles

const swap = document.getElementById('swapperSymbol');

swap.addEventListener('click', () => {
    let Source = document.getElementById('src');
    let Dest = document.getElementById('dest');

    let srcValue = Source.value;
    let destValue = Dest.value;


    if (srcValue === '' || destValue === '') {
        alert("values must not be empty");
        console.log('Values are empty, swap not allowed');
        return;
    }
    swap.classList.toggle('swapped')
});


