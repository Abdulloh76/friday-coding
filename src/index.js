import { Article } from './js/Article.js';
import { Modal } from './js/Modal.js';
import { ArticleModal } from './js/ArticleModal.js';

const data = [
    {
        id: 1,
        title: 'Increasing Prosperity With Positive Thinking',
        urlToImage: './src/img/strategies/1.jpg',
        tags: ['Art', 'Design'],
        content: 'Knowing yourself is the first, and a very critical step in the process of planning your future. How can you figure out what you want to do with your life if you don’t know: What am I going to do with the  rest of my life? What is my dream job? What do I enjoy doing? What’s my passion? What kind of career fits my personality?',
        date: '01.01.2020'
    },
    {
        id: 2,
        title: 'Motivation Is The First Step To Success',
        urlToImage: './src/img/strategies/2.jpg',
        tags: ['Culture'],
        content: 'Knowing yourself is the first, and a very critical step in the process of planning your future. How can you figure out what you want to do with your life if you don’t know: What am I going to do with the  rest of my life? What is my dream job? What do I enjoy doing? What’s my passion? What kind of career fits my personality?',
        date: '01.01.2020'
    },
    {
        id: 3,
        title: 'Success Steps For Your Personal Or Business Life',
        urlToImage: './src/img/strategies/3.jpg',
        tags: ['Culture', 'Design', 'Art'],
        content: 'Knowing yourself is the first, and a very critical step in the process of planning your future. How can you figure out what you want to do with your life if you don’t know: What am I going to do with the  rest of my life? What is my dream job? What do I enjoy doing? What’s my passion? What kind of career fits my personality?',
        date: '01.01.2020'
    }
];

window.onload = () => {
    console.log('Hello RS School');
    
    // Render Articles
    if(data) {
        renderArticlesToDom();
    } 

    // Tools
    addToolsClickHandler();

    // Tags
    addTagsClickHandler();
}

const addTagsClickHandler = () => {
    document.querySelector('.strategies__tags').addEventListener('click', (el) => {
        console.log(el.target);
        if(el.target.classList.contains('tag')) {
            let clickedTag = el.target;
            removeSelectedTags();
            selectedClickedTag(clickedTag);
            if(clickedTag.innerText === 'All') {
                showAllStrategies();
            } else {
                filterStrategiesBySelectedTag(clickedTag);
            }
        }
    })
}

const removeSelectedTags = () => {
    let tags = document.querySelectorAll('.strategies__tags .tag');
    console.log(tags)
    tags.forEach(tag => {
        tag.classList.remove('tag_selected');
        tag.classList.add('tag_bordered');
    })
}

const selectedClickedTag = (clickedTag) => {
    clickedTag.classList.remove('tag_bordered');
    clickedTag.classList.add('tag_selected');
}

const showAllStrategies = () => {
    let strategies = document.querySelectorAll('.strategy');
    strategies.forEach(strategy => {
        strategy.classList.remove('strategy_hidden');
    })
}

const filterStrategiesBySelectedTag = (clickedTag) => {
    let strategies = document.querySelectorAll('.strategy');
    strategies.forEach(strategy => {
        strategy.classList.add('strategy_hidden');
        strategy.querySelectorAll('.tag').forEach(tag => {
            if(tag.innerText === clickedTag.innerText) {
                strategy.classList.remove('strategy_hidden');
            }
        })
    })
}

// Render Articles 
const renderArticlesToDom = () => {
    let strategiesWrapper = document.querySelector('.strategy-wrapper');
    strategiesWrapper.innerHTML = '';

    generateArticles(data).forEach(article => {
        strategiesWrapper.append(article.generateArticle());
    })

    addStrategiesClickHandler();
}

const generateArticles = (data) => {
    let articles = [];
    data.forEach(article => {
        articles.push(new Article(article));
    });
    return articles;
} 


const addToolsClickHandler = () => {
    document.querySelector('.tools__button .button').addEventListener('click', () => {
        generateToolsModal();
    })
}

const generateToolsModal = () => {
    renderModalWindow('Test content for Tools Modal');
}
const renderModalWindow = (content) => {
    let modal = new Modal('tools-modal');
    modal.buildModal(content);
}


const addStrategiesClickHandler = () => {
    document.querySelector('.strategy-wrapper').addEventListener('click', el => {
        if(el.target.closest('.strategy')) {
            console.log(el.target.closest('.strategy'))
            let clickedStrategyId = el.target.closest('.strategy').getAttribute('data-id');
            let clickedStrategyData = getClickedData(clickedStrategyId);

            renderArticleModalWindow(clickedStrategyData);
        }
    })
}

const getClickedData = (id) => {
    return data.find(article => article.id == id);
}

const renderArticleModalWindow = (data) => {
    let modal = new ArticleModal('article-modal', data);
    modal.renderModal();
}