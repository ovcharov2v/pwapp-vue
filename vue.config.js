module.exports = {
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "mdb-vue-ui-kit/src/scss/index.free.scss";`,
            },
        },
    },
};
