import pagination from './pagination.js';
import productModal from './productModal.js';
import delProductModal from './delProductModal.js';

Vue.component('pagination', pagination);
Vue.component('productModal', productModal);
Vue.component('delProductModal', delProductModal);

const url = 'https://course-ec-api.hexschool.io/api/';

new Vue({
    el: '#app',
    data: {
        tempProduct: {
            imageUrl: []
        },
        isNew: false,
        products: [],
        pagination: {},
        user: {
            token: '',
            uuid: '7d6af3ec-1d81-48f8-8d68-f01597cd5fd6'
        },
    },
    methods: {
        openModal(action, item) {
            switch (action) {
                case 'new':
                    this.$refs.productModal.tempProduct = {
                        imageUrl: []
                    };
                    this.isNew = true;
                    $('#productModal').on('show.bs.modal', e => {
                        $('#productModalLabel').text("新增產品");
                    }).modal('show');
                    break;
                case 'edit':
                    this.tempProduct = Object.assign({}, item);
                    this.$refs.productModal.getProduct(this.tempProduct.id);
                    this.isNew = false;
                    break;
                case 'delete':
                    this.tempProduct = Object.assign({}, item);
                    $('#delProductModal').modal('show');
                    break;
                case 'option':
                    this.tempProduct = Object.assign({}, item);
                    this.$refs.appraisalModal.getProduct(this.tempProduct.id);
                    break;
                default:
                    break;
            }
        },
        getProducts(num = 1) {
            const api = `${url}${this.user.uuid}/admin/ec/products?page=${num}`;

            axios.get(api).then(res => {
                console.log(res);
                this.products = res.data.data;
                this.pagination = res.data.meta.pagination;
            });
        }
    },
    created() {
        this.user.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        if (this.user.token === '')
            window.location = './login.html';
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.user.token}`;
        this.getProducts();
    },
});