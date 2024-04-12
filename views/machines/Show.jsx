const React = require('react');
const DefaultLayout = require('../layout/Default')

class Show extends React.Component {
    render() {
        const machine = this.props.machine;

        return (
            <DefaultLayout title="Show an Individual Machine">
                <p>The {machine.name} is {machine.color} {machine.brand} </p>
                {machine.readyToUse ? 'It is ready to use' : "NOT READY!"}
                <br />
                <a href={`/machines/${machine._id}/edit`}>Edit This Machine</a>
                <form action={`/machines/${machine._id}?_method=DELETE`} method="POST">
                    <input type="submit" value="DELETE" />
                </form>
                <a href="/machines">Back to Index</a>
            </DefaultLayout >

        )
    }
}

module.exports = Show;