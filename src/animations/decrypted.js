const letters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ!@#$%&=?¿*+-ç^" ;

const intervals = new WeakMap();
let isActive = new WeakMap();

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll(".decrypt").forEach(element => {
        element.addEventListener("mouseover", event => {
            if (isActive.get(element)) return
            isActive.set(element, true)
            let iteration = 0;
            const previousInterval = intervals.get(element);
            if (previousInterval) clearInterval(previousInterval);
            const newInterval = setInterval(() => {
                event.target.innerText = event.target.innerText
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return event.target.dataset.value[index];
                        }
                        return letters[Math.floor(Math.random() * 41)]
                    })
                    .join("");
                if (iteration >= event.target.dataset.value.length) {
                    clearInterval(newInterval);
                    intervals.delete(element);
                    isActive.set(element, false)
                }
                iteration += 1 / 6;
            }, 50);
            intervals.set(element, newInterval);
        });
    });
});
