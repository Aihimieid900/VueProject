import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadedImages: [
      { src: require(`@/images/8.jpg`),title: 'Chartwell is an English country house near the town of Westerham, Kent.',date: new Date(),location: 'paris', id: '0',description: 'lorem'},
      { src: require(`@/images/12.jpg`),title: '1923 – The Mandate for Palestine came into effect.',date: new Date(),location: 'New York', id: '1',description: 'lorem'},
      { src: require(`@/images/14.jpg`),title: 'Astronomers announce that 2I/Borisov is the first verified interstellar comet.',date: new Date(),location: 'Soudi', id: '2',description: 'lorem'},
    ],
    user: null,
    loading: false,
    error: null,
  },
  mutations: {
    setLoadedImage(state, payload) {
      state.loadedImages = payload
    },
    createMeetup(state, payload) {
        state.loadedImages.push(payload)
    },
    setUser(state, payload) {
      state.user = payload
    },
    setLoading(state, payload) {
      state.loading = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    loadImages({commit}) {
      commit('setLoading', true)
      firebase.database().ref('images').once('value')
      .then((data) => {
        const images = []
        const obj = data.val()
        for (let key in obj) {
          images.push({
          id: key,
          title: obj[key].title,
          location: obj[key].location,
          description: obj[key].description,
          date: obj[key].date,
          imageSrc: obj[key].imageSrc,   
          createrId: obj[key].createrId
          })
          commit('setLoadedImage', images)
        }
        commit('setLoading', false)
      }
      )
      .catch(
        (error) => {
        console.log(error)
        commit('setLoading', true)
      }
      )
    },
    createMeetup({ commit, getters }, payload) { 
      const image = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        createrId: getters.user.id
      }
      let imageSrc
      let key
      firebase.database().ref('images').push(image)
      .then((data) => {
         key = data.key
        return key
      })
      .then(key => {
        const filename = payload.photo.name
        const ext = filename.slice(filename.lastIndexOf('.'))
       return firebase.storage().ref('images/' +key + '.' + ext).put(payload.photo)
      })
      .then( fileData => {
         imageSrc = fileData.metadata().downloadURLs[0]
          return firebase.database().ref('images').child(key).update({ imageSrc: imageSrc }) 
      })
      .then( () => {
        commit('createMeetup', {
        ...image,
        imageSrc: imageSrc,
        id: key})
      })  
       .catch(
        (error) => {
        console.log(error)
      }
      )
    },
    signUpUserStore({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser ={
              id: user.uid,
              registereImages: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
              
          }
        )
    },
    signInUserStore({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser ={
              id: user.uid,
              registereImages: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
          }
        )
    },
    autoSignIn({commit} , payload){
      commit('setUser', {id: payload.uid, registereImages: [] })
    },
    logout ({commit}) {
      firebase.auth().signOut();
      commit('setUser', null)
    }
    ,
    clearError({ commit }) {
      commit('clearError')
    }
  },
  getters: {
    loadedImages(state) {
      return state.loadedImages.sort((imageA, imageB) => {
        return imageA.date > imageB.date
      })
    },
    loadedImage(state) {
      return (imageId) => {
        return state.loadedImages.find((image) => {
          return image.id === imageId
        })
      }
    },
    user(state) {
       return state.user
    },
    loading(state) {
      return state.loading
   },
    error(state) {
      return state.error
   }
  }
});
