<template>
	<v-container fluid>
			<v-row>
				<v-col class="col-md-8 offset-md-2	">
					<v-card 
					 v-for="image in images"
					 :key="image.id"
					 class="mb-2"
					>
						<v-row flex>
							<v-col class="col-12 col-sm-4"	>
								<v-img    
									class="white--text pa-2 ml-2"
									height="200px"
									:src="image.imageSrc"
									:alt="image.title"
								> 
								</v-img>
							</v-col>
							<v-col class="col-12 col-sm-4	">
								<v-card-title>{{ image.title }}</v-card-title>
								<v-card-text>
								<div><span class="font-weight-medium">Date: </span>{{ image.date | date }}</div>
								<div><span class="font-weight-medium">place: </span>{{ image.location.toUpperCase() }}</div>
								</v-card-text>
									<v-card-actions>
											<v-btn :to="`/meetups/`+ image.id" depressed text color="deep-purple darken-2">
											<v-icon>fa-long-arrow-alt-right mr-2</v-icon>
											View MeetUp
										</v-btn>
									</v-card-actions>
							</v-col>		
						</v-row>
					</v-card>
				</v-col>
			</v-row>
	</v-container>
</template>
<script>
export default {
	  computed: {
        images() {
          return this.$store.getters.loadedImages            
        }
    }
}
</script>