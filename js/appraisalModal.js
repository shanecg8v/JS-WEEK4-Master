export default {
    template: `
    <div class="modal fade" id="appraisalModal" tabindex="-1" role="dialog" aria-labelledby="appraisalModalLabel"
    aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header bg-info text-white">
                    <h5 class="modal-title" id="appraisalModalLabel">評價內容</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="carouselAppraisalControls" class="carousel slide" data-ride="carousel">
                        <template v-if="tempProduct.options.comments.length> 0">
                            <div class="carousel-inner">
                                <div class="carousel-item media" :class="{'active': index === 1}"
                                    v-for="(item,index) in tempProduct.options.comments" :key="item.name">
                                    <img :src="item.avator" class="mr-3 image-fluid user-avator">
                                    <div class="media-body">
                                        <h5 class="mt-0">{{item.name}}</h5>
                                        {{item.comment}}
                                    </div>
                                </div>
                            </div>
                            <a class="carousel-control-prev" href="#carouselAppraisalControls" role="button"
                                data-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="sr-only">Previous</span>
                            </a>
                            <a class="carousel-control-next" href="#carouselAppraisalControls" role="button"
                                data-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="sr-only">Next</span>
                            </a>
                        </template>
                        <div class="text-danger text-center" v-else>目前無任何評價</div>
                    </div>

                </div>
            </div>
        </div>
    </div>`,
    props: ['', 'user'],
    data() {
        return {
            tempProduct: {
                imageUrl: [],
                options: {}
            }
        }
    },
    methods: {
        getProduct(id) {
            const api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product/${id}`;
            axios.get(api).then(res => {
                this.tempProduct = res.data;
                $('#appraisalModal').modal('show');
            }).catch(error => {
                console.log(error);
            });
        },

    }
}