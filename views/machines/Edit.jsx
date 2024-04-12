//Machines/Edit.jsx
const React = require('react');
// As you can see we are using the app layout
const DefaultLayout = require('../layout/Default.jsx')

class Edit extends React.Component{
  render() {
    return (
      <DefaultLayout title="Edit Page">      
     {/* See the Layout takes in a prop called Title and we pass Edit Page to it  note: comments can't go first or last in  jsx return*/}
          {/* form is not complete we will do that below*/}
      <form action={`/machines/${this.props.machine._id}?_method=PUT`} method="POST">
          Name: <input type="text" name="name" defaultValue={this.props.machine.name}/><br/>
          Color: <input type="text" name="color"  defaultValue={this.props.machine.color}/><br/>
          Brand: <input type="text" name="brand"  defaultValue={this.props.machine.brand}/><br/>
          Is Ready To Use:
              { this.props.machine.readyToUse? <input type="checkbox" name="readyToUse" defaultChecked />: <input type="checkbox" name="readyToUse"/> }
          <br/>
          <input type="submit" value="Submit Changes"/>
      </form>
      </DefaultLayout>
    )
  }
}
module.exports= Edit;