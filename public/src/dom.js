
export const dom = (() => {

    function createListCats(arrCats, idcontainer, url, callbackAction) {
        const cnt = document.getElementById(idcontainer);
        arrCats.forEach((el, i) => {
            const a = document.createElement('A');
            a.classList.add('list-group-item', 'list-group-item-action', 'list-group-item-success');
            a.href = url;
            a.textContent = el;
            a.addEventListener('click', async e => {
            if (e.target.nodeName === 'A') {
                e.preventDefault();
                await callbackAction.call(this, url, e.target.textContent);
            }
            });
            cnt.appendChild(a);
        });
    }

    const publicApi = { createListCats };
    return publicApi;
})();
