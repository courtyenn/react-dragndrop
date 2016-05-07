export default class List extends Component{
    render(){
        return(
            <div>
                <h2>{this.props.title}</h2>
                <ul>
                    {this.props.children}
                </ul>
            </div>
        );
    }
}
