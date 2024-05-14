import { Entity } from "@sepano/mini-redux";

export const tasks = new Entity({ items: [] as string[] });

// storage middleware
tasks.use({
    set(data, next) {
        localStorage.setItem(
            'tasks',
            JSON.stringify(data.items)
        );

        next(data);
    },
    init: function (
        next: Function
    ) {
        const initData = JSON.parse(
            localStorage.getItem('tasks') || '[]'
        );
        
        next(initData);

        return { items: initData };
    }
});

// logger middleware
tasks.use({
    set(data, next) {
        console.log('data => ', data)
        next(data);
    },
    init: function (
        next: Function
    ) {
        const initData = { items: [] };
        next(initData);

        return initData;
    }
});