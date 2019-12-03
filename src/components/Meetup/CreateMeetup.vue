<template>
	<v-container fluid>
			<v-row>
				<v-col class="col-md-8 offset-md-2">
                    <h2 class="display-3 font-weight-regular blue-grey--text darken-3 ">
                        Create Meetup
                    </h2>
                    <form @submit.prevent="onCreateMeetup">
                    <v-flex class="mt-8 pa-6">
                    <v-text-field
                        name="Title"
                        id="title"
                        label="Title*" 
                        v-model="title"    
                        outlined
                        required
                     ></v-text-field>
                     <v-text-field
                        name="location"
                        id="location"
                        label="Location*"
                        v-model="location"
                        outlined     
                        required
                     ></v-text-field>
                     <input 
                     type="file" 
                     style="display:none" 
                     ref="fileInput" 
                     accept="image/*"
                     @change="onFilePicked"
                     >
                       <v-btn reised @click="onfilePic"   class="mb-6">Upload Image</v-btn>
                     <img 
                     :src="imageSrc" 
                     :alt="description" 
                     style="height:150px;margin-left:-150px"
                     class="mb-10"
                     />
                     <v-textarea
                        name="description"
                        id="description"
                        label="Description*"
                        v-model="description"
                        outlined
                        required
                     ></v-textarea>
                        <v-row>
                            <v-col class="col-12 col-md-6">
                            <h3 class="font-weight-regular blue-grey--text darken-3 mb-2">Choose Date</h3>
                            <v-date-picker class="d-flex justify-start" full-width color="deep-purple darken-5" v-model="pickerDate"></v-date-picker>
                            </v-col>
                            <v-col class="col-12 col-md-6">
                            <h3 class="font-weight-regular blue-grey--text darken-3 mb-2">Choose Time</h3>
                            <v-time-picker class="d-flex justify-end" color="deep-purple darken-5" v-model="pickerTime"></v-time-picker>
                            </v-col>
                        </v-row>
                    </v-flex>
                    <v-flex>
                        <v-btn 
                        large 
                        :dark="formIsVaild"
                         class="red" elevation="1" 
                         :disabled="!formIsVaild"
                         type="submit"
                          >
                            Create Meetup
                        </v-btn>
                    </v-flex>
                    </form>
				</v-col>
			</v-row>
	</v-container>
</template>
<script>

export default {
    data: () => ({
        title:'',
        location: '', 
        imageSrc: '',  
        description: '',
        date: new Date(),
        pickerDate: new Date().toISOString().substr(0, 10),
        pickerTime: new Date(),
        photo: null
    //     value:0,
    //     rules: [
    //     value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
    //   ],
    }),
    computed: {
        formIsVaild() {
            return this.title !== '' &&
            this.location !== '' &&
            this.description !== ''
               },
        submitDate() {
            const date = new Date(this.pickerDate)    
            if (typeof this.pickerTime === 'string') {
                const Hours = this.pickerTime.match(/^(\d+)/) [1]
                const Minutse = this.pickerTime.match(/:(\d+)/) [1]
                date.setHours(Hours)
                date.setMinutes(Minutse)
            } else{
                date.setHours(this.pickerTime.getHours())
                date.setMinutes(this.pickerTime.getMinutes())
            }
            return date
        },
    },
    methods: {
        onCreateMeetup() {
            if (!this.photo){
                return
            }
            const meetupUpdata = {
            title: this.title,
            location: this.location,
            description: this.description,
            photo: this.photo,
            date: this.submitDate
            }
            this.$router.push('/meetups')
            this.$store.dispatch('createMeetup', meetupUpdata)
        },
        onfilePic(){
            this.$refs.fileInput.click()
        },
        onFilePicked(event) {
            const files = event.target.files
            let filename =files[0].name
            if (filename.lastIndexOf('.') <= 0 ) {
                return alert('Please Add A Valid file')
            }
            const fileReader = new FileReader()
            fileReader.addEventListener('load', () => {
                this.imageSrc = fileReader.result
            })
            fileReader.readAsDataURL(files[0])
            this.photo = files[0]
        }
    }
}
</script>