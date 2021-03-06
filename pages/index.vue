<template>
    <v-card height="800" elevation="8" rounded="xl" class="my-16">
        <div class="d-flex">
            <!-- 顯示當前座標 -->
            <div>
                <v-card-title
                    >你當前的位置: 經度:{{ userPosition.lng }} 緯度:
                    {{ userPosition.lat }}</v-card-title
                >
                <!-- 上傳當前位置並留言 -->
                <v-card-subtitle @click="dialog = true">
                    <v-btn color="primary">上傳我的位置</v-btn>
                </v-card-subtitle>
                <v-row>
                    <v-dialog v-model="dialog" width="600">
                        <v-card>
                            <!-- 表單標題 -->
                            <v-card-title>上傳位置</v-card-title>
                            <!-- 用戶名稱 -->
                            <v-card-subtitle class="my-2"
                                >用戶: 王小明</v-card-subtitle
                            >
                            <v-card-text>
                                <v-row>
                                    <v-col>
                                        <v-textarea
                                            label="介紹你目前的所在地"
                                            name="comment"
                                        ></v-textarea>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <!-- 按鈕區域 -->
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    @click="dialog = false"
                                    color="red"
                                    outlined
                                    >取消</v-btn
                                >
                                <v-btn color="primary">確認</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-row>
            </div>
            <div class="mt-3">
                <!-- 自動完成輸入 -->
                <GmapAutocomplete>
                    <template v-slot:input="slotProps">
                        <v-text-field
                            outlined
                            prepend-inner-icon="mdi-magnify"
                            placeholder="搜尋地點"
                            ref="input"
                            v-on:listeners="slotProps.listeners"
                            v-on:attrs="slotProps.attrs"
                        >
                        </v-text-field>
                    </template>
                </GmapAutocomplete>
            </div>
        </div>
        <!-- google 地圖畫面 -->
        <GmapMap
            :center="userPosition"
            :zoom="10"
            style="width: 100%; height: 650px"
        >
            <!-- 座標點視窗 -->
            <GmapInfoWindow
                :options="infoOptions"
                :position="infoWindowPosition"
                :opened="infoWinOpen"
                @closeclick="infoWinOpen = false"
            ></GmapInfoWindow>
            <!-- 預設座標點位 -->
            <GmapMarker
                v-for="(mark, index) in markers"
                :key="index"
                :position="mark.position"
                :icon="mark.icon"
                :title="mark.title"
                :clickable="true"
                @click="toggleInfoWindow(mark, index)"
            ></GmapMarker>
        </GmapMap>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            // 上傳座標的表單
            dialog: false,
            // 搜尋的點位
            place: null,
            // 座標點視窗
            infoWindowPosition: null,
            infoWinOpen: false,
            currentMiddleIndex: null,
            infoOptions: {
                content: '預設文字',
                //optional: offset infowindow so it visually sits nicely on top of our marker
                pixelOffset: {
                    width: 0,
                    height: -40,
                },
            },
            // 使用者目前的座標
            userGeolocation: {
                // 預設點位
                position: {
                    lat: 24.950659,
                    lng: 121.2568154,
                },
            },
            // 當前地圖中心點
            center: {
                // 健行科大經緯度
                lat: 24.947237,
                lng: 121.229167,
            },
            // 測試用標點
            markers: [
                {
                    position: {
                        lat: 24.947237,
                        lng: 121.229167,
                    },
                    infoText: '<b>測試456</b>',
                },
            ],
        }
    },
    computed: {
        userPosition() {
            //預設座標
            const defaultUserPosition = {
                position: {
                    lat: 21.850659,
                    lng: 120.2568154,
                },
            }
            //真實座標
            if (this.userGeolocation != null) {
                return this.userGeolocation
            }
            return defaultUserPosition
        },
    },
    methods: {
        // 寫入使用者的座標
        setUserPosition(data) {
            this.userGeolocation = data.position
        },
        // 獲得使用者的座標
        async getGeoLocation() {
            if (navigator.geolocation) {
                await navigator.geolocation.getCurrentPosition((pos) => {
                    const data = 
                    {
                        position: {
                            lat: pos.coords.latitude,
                            lng: pos.coords.longitude,
                        },
                        icon: {
                            url: 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png',
                        },
                        infoText: '你目前的位置',
                    }
                    this.setUserPosition(data)
                    this.addUserMarker(data)
                })
            }
        },
        // 切換座標點資訊視窗
        toggleInfoWindow(marker, index) {
            this.infoWindowPosition = marker.position
            this.infoOptions.content = marker.infoText
            // 檢查是否是相同的 marker 被選取，如果是則切換
            if (this.currentMiddleIndex == index) {
                this.infoWinOpen = !this.infoWinOpen
            }
            // 如果是不同的 marker 則打開該 marker 的視窗，且重設當前 marker 的索引(index)
            else {
                this.infoWinOpen = true
                this.currentMiddleIndex = index
            }
        },
        addUserMarker(data) {
            this.markers.push(data)
        },
    },
    mounted() {
        this.getGeoLocation()
    },
}
</script>

<style></style>
