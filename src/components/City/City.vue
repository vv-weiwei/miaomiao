<template>

    <div class="city_body">
        <!-- <div class="city_list">
                <div class="city_hot">
                    <h2>热门城市</h2>
                    <ul class="clearfix">
                        <li>上海</li>
                    </ul>
                </div>
                <div class="city_sort">
                    <div>
                        <h2>A</h2>
                        <ul>
                            <li>阿拉善盟</li>
                            <li>鞍山</li>
                            <li>安庆</li>
                            <li>安阳</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="city_index">
                <ul>
                    <li>A</li>
                    <li>B</li>
                    <li>C</li>
                    <li>D</li>
                    <li>E</li>
                </ul>
            </div> -->
        <div class="city_list">

            <div>
                <div class="city_hot">
                    <h2>热门城市</h2>
                    <ul class="clearfix">
                        <li
                                v-for="item in hostList"
                                :key="item.id"
                                @tap="handleToCity(item.nm, item.id)"
                        >
                            {{ item.nm }}
                        </li>
                    </ul>
                </div>
                <div class="city_sort" ref="city_sort">
                    <div v-for="item in cityList" :key="item.index">
                        <h2>{{ item.index }}</h2>
                        <ul>
                            <li
                                    v-for="itemList in item.list"
                                    :key="itemList.id"
                                    @tap="handleToCity(itemList.nm, itemList.id)"
                            >
                                {{ itemList.nm }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
        <div class="city_index">
            <ul>
                <li
                        v-for="(item, index) in cityList"
                        :key="item.index"
                        @touchstart="handleToIndex(index)"
                >
                    {{ item.index }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "City",
    data() {
        return {
            cityList: [],
            hostList: []
        }
    },
    async mounted() {
        const res = await this.$http.get('/api/dianying/cities.json')
        if (res.status === 200) {
            let cities = res.data.cts
            //数据分组
            let {cityList, hostList} = this.formatCityList(cities)
            this.cityList = cityList
            this.hostList = hostList

        }


    },
    methods: {
        formatCityList(cities) {
            let cityList = [];
            let hostList = [];
            //取出前16个认作是热门城市
            for (let i = 0; i < 20; i++) {
                hostList.push(cities[i])
            }

            for (let i = 0; i < cities.length; i++) {
                let firstLetter = cities[i].py.substring(0, 1).toUpperCase();
                if (toCom(firstLetter)) {//新添加index
                    cityList.push({index: firstLetter, list: [{nm: cities[i].nm, id: cities[i].id}]})
                } else {
                    //累加到已有index
                    for (let j = 0; j < cityList.length; j++) {
                        if (cityList[j].index === firstLetter) {
                            cityList[j].list.push({nm: cities[i].nm, id: cities[i].id})
                        }
                    }
                }
            }
            //按城市字母排序
            cityList.sort((n1, n2) => {
                if (n1.index < n2.index) {
                    return -1
                } else {
                    return 1
                }
            })

            function toCom(firstLetter) {
                for (let i = 0; i < cityList.length; i++) {
                    if (cityList[i].index === firstLetter) {
                        return false
                    }
                }
                return true
            }


            return {
                cityList,
                hostList
            }
        },
        handleToCity() {

        },
        handleToIndex(index) {

            let h2 = this.$refs.city_sort.getElementsByTagName('h2')

            this.$nextTick(() => {
                this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;
            });


        }
    }
}
</script>

<style scoped>
    .city_body .city_list {
        flex: 1;
        overflow: auto;
        background: #fff5f0;
    }

    .city_body .city_list::-webkit-scrollbar {
        background-color: transparent;
        width: 0;
    }

    .city_body .city_hot {
        margin-top: 20px;
    }

    .city_body .city_hot h2 {
        padding-left: 15px;
        line-height: 30px;
        font-size: 14px;
        background: #f0f0f0;
        font-weight: normal;
    }

    .city_body .city_hot ul li {
        float: left;
        background: #fff;
        width: 29%;
        height: 33px;
        margin-top: 15px;
        margin-left: 3%;
        padding: 0 4px;
        border: 1px solid #e6e6e6;
        border-radius: 3px;
        line-height: 33px;
        text-align: center;
        box-sizing: border-box;
    }

    .city_body .city_sort div {
        margin-top: 20px;
    }

    .city_body .city_sort h2 {
        padding-left: 15px;
        line-height: 30px;
        font-size: 14px;
        background: #f0f0f0;
        font-weight: normal;
    }

    .city_body .city_sort ul {
        padding-left: 10px;
        margin-top: 10px;
    }

    .city_body .city_sort ul li {
        line-height: 30px;

    }

    .city_body .city_index {
        position: absolute;
        right: 5px;
        top: 568px;
        border-left: 1px #e6e6e6 solid;
    }
</style>
