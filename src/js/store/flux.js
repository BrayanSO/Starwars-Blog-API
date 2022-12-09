const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			planets: [],
			films:[],
			starships:[],
			people:[],
			species:[],
			starships:[],
			vehicles:[]
		},
		actions: {
			getStarWars:async (resource, pagination= {})=> {
				/*pagination 
				page: representa la pagina a mostrar
				limit: cuantos elementtos maximos se van a mostrar

				*/
				let params=""
				if(!!pagination.page){
					params=`?page=${pagination.page}&limit=${pagination.limit||10}`

				}
				let resp = await fetch("https://www.swapi.tech/api/"+ resource + params)
				if(!resp.ok){
					console.error(resp.status + ":" + resp.statusText)
					return
				}
				let data = await resp.json()
				let newStore = {
					...getStore()
				}
				newStore[resource] = data.result || data.results
				setStore(newStore)
				return{
					records:data.total_records|| null,
					pages:data.total_pages|| null
				}
		},
		getStarWarsDetail: async (resource,id)=> {
			let resp=await fetch (`https://www.swapi.tech/api/${resource}/${id}`)
			if(!resp.ok){
				console.error(`Error: ${resp.status}: ${resp.statusText}`)
				return
			}
			let data=await resp.json()
			return {
				...data.result.properties
			}
		}
	}

	};
};

export default getState;
