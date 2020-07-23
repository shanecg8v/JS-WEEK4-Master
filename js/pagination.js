export default {
    template: `<nav aria-label="Page navigation example">
                <ul class="pagination">
                <li class="page-item" :class="{disabled: currentPage === 1}">
                    <a class="page-link" aria-label="Previous" @click.prevent="emitPages(currentPage - 1)">
                    <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li class="page-item" :class="{ active: i === currentPage }" v-for="i in totalPages" :key="i">
                    <a class="page-link" @click.prevent="emitPages(i)">{{i}}</a>
                </li>
                <li class="page-item" :class="{disabled: currentPage === totalPages}">
                    <a class="page-link" aria-label="Next" @click.prevent="emitPages(currentPage + 1)">
                    <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
                </ul>
            </nav>`,
    props: ['totalPages', 'currentPage'],
    methods: {
        emitPages(num) {
            this.$emit('emit-pages', num);
        }
    }
}