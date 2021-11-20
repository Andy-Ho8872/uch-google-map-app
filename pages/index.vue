<template>
    <v-card height="800" elevation="8" rounded="xl" class="my-16">
        <div class="d-flex">
            <!-- 顯示當前座標 -->
            <div>
                <v-card-title
                    >你當前的位置: 經度:{{ userGeolocation.lng }} 緯度:
                    {{ userGeolocation.lat }}</v-card-title
                >
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
            :center="userGeolocation"
            :zoom="14"
            style="width: 100%; height: 650px"
        >
            <!-- 預設座標點位 -->
            <GmapMarker
                v-for="(mark, index) in markers"
                :key="index"
                :position="mark.position"
            ></GmapMarker>
            <!-- 使用者的座標 -->
            <GmapMarker
                :position="userGeolocation"
                title="你的位置"
                :icon="userGeolocation.icon"
                size="18"
            ></GmapMarker>
        </GmapMap>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            // 搜尋的點位
            place: null,
            // 使用者目前的座標
            userGeolocation: {
                //預設座標
                lat: 24.950659,
                lng: 121.2568154,
            },
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
                },
            ],
        }
    },
    methods: {
        // 寫入使用者的座標
        setUserPosition(position) {
            this.userGeolocation = position
        },
        // 獲得使用者的座標
        async getGeoLocation() {
            if (navigator.geolocation) {
                await navigator.geolocation.getCurrentPosition((position) => {
                    const userPosition = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        icon: {
                            url: 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png',
                        },
                    }
                    this.setUserPosition(userPosition)
                })
            }
        },
        addMarker() {
            this.markers.push({
                position: {
                    lat: 24.937237,
                    lng: 121.22814,
                },
            })
        },
        // setPlace(place) {
        //     if (!place) return
        //     this.markers.push({
        //         position: {
        //             lat: this.place.geometry.location.lat(),
        //             lng: this.place.geometry.location.lng(),
        //         },
        //     })
        //     console.log(this.markers)
        // },
    },
    mounted() {
        this.getGeoLocation()
        this.addMarker()
    },
}
</script>

<style></style>
