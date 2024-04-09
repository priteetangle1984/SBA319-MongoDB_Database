const React = require('react');
const DefaultLayout = require('../layout/Default')

class Index extends React.Component {
    render() {
        const { machines } = this.props;
        // const machines = this.props.machines;

        return (
            <DefaultLayout title={"Machines Index Page"}>
                <nav>
                    <a href="/machines/new">Create a New Machine</a>
                </nav>
                <ul>
                    {machines.map((machine, i) => {
                        return (
                            <li>
                                The {' '}
                                <a href={`/machines/${machine._id}`}>
                                    {machine.name}
                                </a> {' '}
                                is {machine.color} <br></br>
                                {machine.readyToUse
                                ? `It is ready to use`
                            :   `It is NOT ready to use`}
                            <br />
                            <a href={`/machines/${machine._id}/edit`}>Edit This Machine</a>
                            <form action={`/machines/${machine._id}?_method=DELETE`} method="POST">
                                <input type="submit" value="DELETE"/>
                            </form>
                            </li>
                        )
                    })

                    }
                </ul>
            </DefaultLayout>
        )
    }
}

module.exports = Index;