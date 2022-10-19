import React, {Component} from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom";
import {isVisible} from "@testing-library/user-event/dist/utils";

class Model extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            model:[],
            sizes:[]

        }
        this.rangeId=1;
        this.modelId=1;


    }
    componentDidMount(){
        let combo=window.location.pathname.split('/');
        this.rangeId=combo[2];
        this.modelId=combo[4];
        const res = fetch(`http://127.0.0.1:8000/range/${this.rangeId}/models/${this.modelId}`)
        .then (res => res.json())
        .then(

            (result) =>{
                this.setState({
                    isLoaded:true,
                    model: result,
                });
                // this.range=result;

            },
            (error) =>{
            this.setState({
                isLoaded:false,
                error});
            }
        )
        this.load_sizes();
    }
    load_sizes(){
        const res2 = fetch(`http://127.0.0.1:8000/range/${this.rangeId}/models/${this.modelId}/stock/`)
        .then (res2 => res2.json())
        .then(

            (result) =>{
                this.setState({
                    isLoaded:true,
                    sizes: result,
                });
                // this.models=result;
                console.log(this.state.sizes)
            },
            (error) =>{
            this.setState({
                isLoaded:false,
                error});
            }
        )
    }


    render() {
        const {error, isLoaded, model, sizes} = this.state;
        console.log(model.modelname)
        const buy=()=> {
            let item=JSON.parse(document.getElementById('size_list').value)
            console.log(item)
            if(item) {
                let combo=window.location.pathname.split('/');
                let rangeId=combo[2];
                let modelId=combo[4];
                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ itemid:item.itemid, idmodel:item.idmodel, size: item.size, amount: item.amount-1 })
                };
                fetch(`http://127.0.0.1:8000/range/${rangeId}/models/${modelId}/stock/${item.itemid}/`, requestOptions)
                    // .then(response => response.json())
                    .then(response=>this.load_sizes())
                // document.getElementById('size_list').load();
                // window.location.reload();
                alert(`Куплено! ${ model.modelname } - ${item.size}`)
                        }
                    }
        return (
            <div>
                <div className={"models_list"}>

                <div className={"model_info"}>

                    <div className={"model_name"}>{model.modelname}</div>
                    <div className={"producer"}>Производитель: {model.producer}</div>
                    <div className={"price"}>Цена: {model.price} руб.</div>
                    <img src={"/images/"+model.image} alt={"model_image:"+model.image} width={"250px"} className={"image"}/>

                    {sizes.length > 0 &&
                        <div>

                        <select name="size_list" id="size_list">
                            <option value="">Выберите размер</option>
                            {sizes.map(item => {
                                // if (item.amount>0) {
                                //     is_empty=false;
                                return <option key={"size:" + item.size}
                                               value={JSON.stringify(item)}>{item.size} ({item.amount} шт.)</option>

                                // }
                            })}
                        </select>
                        <input id="buy_button" className="buy_button" type="submit" value="Купить!" onClick={buy}/>
                        </div>
                    }
                    {!sizes.length &&
                        <div className={"error_message"} id={"error_message"}>
                            Размеров нет!
                        </div>

                    }
                </div>


                </div>


            </div>
        );
    }
}

export default Model;