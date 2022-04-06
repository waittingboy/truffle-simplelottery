import {Component} from 'react';
import LotteryContract from "./contracts/Lottery.json";
import getWeb3 from "./utils/getWeb3";
import CardExampleCard from "./display/ui";

class App extends Component {
    state = {
        web3: null, accounts: null, contract: null, address: null,
        currentAccount: null, manager: null, players: null, playersCount: 0, balance: 0, winner: null, round: 0
    }

    componentDidMount = async () => {
        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3();

            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();

            // Get the contract instance.
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = LotteryContract.networks[networkId]
            const address = deployedNetwork && deployedNetwork.address
            const instance = new web3.eth.Contract(LotteryContract.abi, address);

            // Set web3, accounts, contract and address to the state, and then proceed with an
            // interacting with the contract's methods.
            this.setState({web3, accounts, contract: instance, address}, this.getData)
        } catch (err) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(err);
        }
    };

    // 获取合约数据
    getData = async () => {
        const {web3, accounts, contract} = this.state;

        let manager = await contract.methods.owner().call()
        let balance = await contract.methods.getBalance().call()
        balance = web3.utils.fromWei(balance, 'ether')
        let round = await contract.methods.getRound().call()
        let playersCount = await contract.methods.getPlayersCount(round).call()
        let players = await contract.methods.getPlayers(round).call()
        let winner = await contract.methods.getWinner(round - 1).call()

        let showButton = accounts[0] === manager ? 'inline' : 'none'

        this.setState({
            currentAccount: accounts[0],
            manager,
            balance,
            round,
            players,
            playersCount,
            winner,
            showButton,
            isClicked: false
        })
    }

    // 投注
    play = async () => {
        const {web3, contract} = this.state;

        this.setState({isClicked: true})

        try {
            await contract.methods.play().send({
                from: this.state.currentAccount,
                value: web3.utils.toWei('1', 'ether'),
                gas: 3000000,
            })

            this.setState({isClicked: false})
            window.location.reload(true) // 自动加载页面
            alert('投注成功！')
        } catch (err) {
            this.setState({isClicked: false})
            alert('投注失败！')
            console.log(err)
        }
    }

    // 开奖
    runLottery = async () => {
        const {contract} = this.state;

        this.setState({isClicked: true})

        try {
            await contract.methods.runLottery().send({
                from: this.state.currentAccount,
                gas: 3000000,
            })

            this.setState({isClicked: false})
            window.location.reload(true) // 自动加载页面
            alert('开奖成功！')
        } catch (err) {
            this.setState({isClicked: false})
            alert('开奖失败！')
            console.log(err)
        }
    }

    // 退奖
    refund = async () => {
        const {contract} = this.state;

        this.setState({isClicked: true})

        try {
            await contract.methods.refund().send({
                from: this.state.currentAccount,
                gas: 3000000,
            })

            this.setState({isClicked: false})
            window.location.reload(true) // 自动加载页面
            alert('退奖成功！')
        } catch (err) {
            this.setState({isClicked: false})
            alert('退奖失败！')
            console.log(err)
        }
    }

    render() {
        return (
            <div>
                <CardExampleCard
                    address={this.state.address}
                    currentAccount={this.state.currentAccount}
                    manager={this.state.manager}
                    balance={this.state.balance}
                    round={this.state.round}
                    players={this.state.players}
                    playersCount={this.state.playersCount}
                    winner={this.state.winner}
                    showButton={this.state.showButton} // 控制是否显示开奖、退奖按钮
                    isClicked={this.state.isClicked} // 控制投注、开奖、退奖按钮状态
                    play={this.play}
                    runLottery={this.runLottery}
                    refund={this.refund}
                />
            </div>
        );
    }
}

export default App;
