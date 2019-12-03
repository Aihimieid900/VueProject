<template>
    <v-container>
        <v-row class="mt-4" >
            <v-col 
                class="d-flex justify-center justify-sm-end col-12 col-sm-6"
            >
                <v-btn  to="/meetups" x-large dark color="deep-purple darken-2">Explore Meetups</v-btn>
            </v-col>
            <v-col 
                class="d-flex justify-center justify-sm-start col-12 col-sm-6"
            >
                <v-btn  to="/meetUp/create" x-large dark color="deep-purple darken-2">Create Meetup</v-btn>
            </v-col>
        </v-row>
         <v-layout
          v-if="loading"
         >
        <v-flex class="text-center mt-12">
       <v-progress-circular  
          indeterminate
         color="purple"
         :size="70"
        :width="7"
        ></v-progress-circular>
        </v-flex>
        </v-layout>
        <v-card 
        v-if="!loading"
        class="mt-6"
        raised
        >
        <v-carousel 
        hide-delimiters
        >
            <v-carousel-item
                v-for="(image, i) in images"
                :key="i"
                :src="image.imageSrc"
                :id="image.id"
                :alt="image.title"
                @click="onLoadMeetup(image.id)"
                width="100%"
                height="100%"
                style="cursor:pointer"
             >
             <v-sheet class="title font-weight-light text-capitalize deep-purple accent-2  text-center uppercase">
                 {{ image.title }}
             </v-sheet>
             </v-carousel-item>
        </v-carousel>
        </v-card>
    </v-container>

</template>
<script>
export default {
    // data: () => ({
    //  ///
    // }),
    computed: {
        images() {
          return this.$store.getters.loadedImages            
        },
        loading() {
          return this.$store.getters.loading            
        }
    },
    methods: {
        onLoadMeetup(id) {
            this.$router.push('/meetups/' + id)
        }
    }
};
</script>