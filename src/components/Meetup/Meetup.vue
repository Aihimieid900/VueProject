<template>
	<v-container fluid>
			<v-row>
				<v-col class="col-md-8 offset-md-2">
					<v-card>
                        <v-card-title>{{ image.title }}</v-card-title>
                        <v-img    
                            class="white--text pa-2 ma-2"
                            height="350px"
                            :src="image.imageSrc"
                            :alt="image.title"
                        > 
                        </v-img>
                        <v-card-text>
                        <div class="deep-purple--text"><span> {{ image.date | date }}</span> - <span class="font-weight-medium"> {{ image.location.toUpperCase() }} </span></div>
                        <p class="font-weight-medium text-left pt-3 pb-0 mb-0">
                            {{ image.description }}
                        </p>
                        </v-card-text>
                        <v-card-actions class="mt-2">
                            <v-spacer></v-spacer>
                                <v-btn dark color="deep-purple darken-2">
                                <v-icon>fa-long-arrow-alt-right mr-2</v-icon>
                                Reagister
                            </v-btn>
                        </v-card-actions>
					</v-card>
				</v-col>
			</v-row>
	</v-container>
</template>
<script>
export default {
    props: ['id'],
computed: {
    image() {
          return this.$store.getters.loadedImage(this.id)            
        }
}
}
</script>
