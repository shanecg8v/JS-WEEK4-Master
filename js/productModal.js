export default {
    template: `
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="productModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header bg-success text-white">
                    <h5 class="modal-title" id="productModalLabel"></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-4">
                                <div class="form-group" v-for="i in 5" :key="i">
                                    <label :for="'img' + i">輸入圖片網址</label>
                                    <input type="text" v-model="tempProduct.imageUrl[i - 1]" class="form-control"
                                        :id="'img' + i" placeholder="請輸入圖片連結"></input>
                                </div>
                                <div class="form-group">
                                    <label for="customFile">
                                        或 上傳圖片
                                        <i v-if="isFileUploading" class="fas fa-spinner fa-spin" aria-hidden="true"></i>
                                    </label>
                                    <input type="file" id="customFile" class="form-control" ref="file" @change="uploadFile">
                                </div>
                                <img :src="tempProduct.imageUrl[0]" alt="" class="img-fluid">
                            </div>
                            <div class="col-8">
                                <div class="form-group">
                                    <label for="productTitle">標題</label>
                                    <input type="text" id="productTitle" class="form-control" placeholder="請輸入標題"
                                        v-model="tempProduct.title">
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-6">
                                        <label for="productCategory">分類</label>
                                        <input type="text" id="productCategory" class="form-control"
                                            placeholder="請輸入分類" v-model="tempProduct.category">
                                    </div>
                                    <div class="form-group col-6">
                                        <label for="productUnit">單位</label>
                                        <input type="text" id="productUnit" class="form-control" placeholder="請輸入單位"
                                            v-model="tempProduct.unit">
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-6">
                                        <label for="productOrigin_price">原價</label>
                                        <input type="number" id="productOrigin_price" class="form-control"
                                            placeholder="請輸入原價" v-model="tempProduct.origin_price">
                                    </div>
                                    <div class="form-group col-6">
                                        <label for="productPrice">售價</label>
                                        <input type="number" id="productPrice" class="form-control"
                                            placeholder="請輸入售價" v-model="tempProduct.price">
                                    </div>
                                </div>
                                <hr />
                                <div class="form-group">
                                    <label for="productContent">產品描述</label>
                                    <textarea id="productContent" class="form-control" placeholder="請輸入產品描述"
                                        v-model="tempProduct.content"></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="productDescription">說明內容</label>
                                    <textarea id="productDescription" class="form-control" placeholder="請輸入說明內容"
                                        v-model="tempProduct.description"></textarea>
                                </div>
                                <div class="form-check">
                                    <label class="form-check-label">
                                        <input type="checkbox" class="form-check-input" id="productEnabled"
                                            v-model="tempProduct.enabled">
                                        是否啟用
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
                </div>
            </div>
        </div>
    </div>`,
    props: ['user', 'isNew'],
    data() {
        return {
            tempProduct: {
                imageUrl: []
            },
            isFileUploading: false
        }
    },
    methods: {
        getProduct(id) {
            const api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product/${id}`;
            axios.get(api).then(res => {
                this.tempProduct = res.data.data;
                $('#productModal').on('show.bs.modal', e => {
                    $('#productModalLabel').text("編輯產品");
                }).modal('show');
            })
        },
        updateProduct() {
            let api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product`;
            let httpMethod = 'post';
            if (!this.isNew) {
                api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product/${this.tempProduct.id}`;
                httpMethod = 'patch';
            }
            axios[httpMethod](api, this.tempProduct).then(res => {
                $('#productModal').modal('hide');
                this.$emit('update');
            }).catch(error => {
                console.log(error);
            });

        },
        uploadFile() {
            const uploadedFile = this.$refs.file.files[0];
            const formData = new FormData();
            const api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/storage`;
            formData.append('file', uploadedFile);
            this.isFileUploading = true;
            axios.post(api, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                this.isFileUploading = false;
                if (res.status === 200)
                    this.tempProduct.imageUrl.push(res.data.data.path);
            }).catch(error => {
                console.log('上傳不可超過 2 MB');
                this.status.fileUploading = false;
            });

        }
    }
}