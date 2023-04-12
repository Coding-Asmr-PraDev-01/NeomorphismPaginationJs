const paginationList = document.querySelector('#pagination-list');
const listItems = paginationList.querySelectorAll('li');
const paginationNumsContainer = document.querySelector('#pagination-numbers');
const prevBtn = document.querySelector('#prev-button');
const nextBtn = document.querySelector('#next-button');
let currentPage = 1;

// find the number of list per page
let pageOffsetLimit = 6;
const pageCount = Math.ceil(listItems.length / pageOffsetLimit);

const appendPageNumberBtn = (ind) => {
    const pageNumberBtn = document.createElement('button');
    pageNumberBtn.setAttribute('page-index', ind);
    pageNumberBtn.className = 'pagination-number-btn';
    pageNumberBtn.innerHTML = ind;

    paginationNumsContainer.appendChild(pageNumberBtn);
}

const generatePageNumBtns = () => {
    for(let i = 1; i <= pageCount; i++){
        appendPageNumberBtn(i);
    }
}

const setCurrPage = (pageNum) => {
    currentPage = pageNum;
    handleActivePageNums();

    // handle enable / disable state of button
    handleButtonStates();

    // calculate the range of btns 
    const startRange = (pageNum - 1) * pageOffsetLimit;
    const endRange = pageNum * pageOffsetLimit;

    // Based on range show the list items
    listItems.forEach((listItem, index) => {
        listItem.classList.add('hidden');
        if(index >= startRange && index <= endRange){
            listItem.classList.remove('hidden');
        }
    });
}

const handleButtonStates = () => {
    // if currentpage is one then disabled previous button
    if(currentPage === 1){
        disabledBtn(prevBtn);
    }else{
        enabledBtn(prevBtn);
    }

    // if currentpage is last then disabled next button
    if(currentPage === pageCount){
        disabledBtn(nextBtn);
    }else{
        enabledBtn(nextBtn);
    }
}

const disabledBtn = (button) => {
    button.classList.add('disabled');
    button.setAttribute('disabled', true);
}

const enabledBtn = (button) => {
    button.classList.remove('disabled');
    button.removeAttribute('disabled');
}

const handleActivePageNums = () => {
    document.querySelectorAll('.pagination-number-btn').forEach((button) => {
        button.classList.remove('active');
        const pageInd = Number(button.getAttribute("page-index"));

        // check if the current btn is as same as ith button
        if(currentPage === pageInd){
            button.classList.add('active');
        }
    });

}


window.addEventListener('load', () => {
    // generating btns 
    generatePageNumBtns();
    setCurrPage(1);

    prevBtn.addEventListener("click", () => {
        setCurrPage(currentPage - 1);
    });
    
    nextBtn.addEventListener("click", () => {
        setCurrPage(currentPage + 1);
    });
    
    document.querySelectorAll('.pagination-number-btn').forEach((button) => {
        let pageInd = Number(button.getAttribute('page-index'));

        if(pageInd){
            button.addEventListener('click', () => {
                setCurrPage(pageInd);
            });
        }
    });

});