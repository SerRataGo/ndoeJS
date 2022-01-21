
//////////////////////////////////////////////////////////
const { program } = require('commander');
const fs = require('fs');
const todos = fs.readFileSync('file1_test.json',{ encoding: 'utf8'});
const todosarray = JSON.parse(todos);

program
.command('add')
.argument('<id> , <id of todo>')
.argument('<name>', 'name of the todo')
.action((id,name)=>
{
    const todo =
            { 
                id,
              name,
            };
            todosarray.push(todo)
fs.writeFileSync("file1_test.json",JSON.stringify(todosarray),{encoding:"utf-8"})
});
// list
program
.command('list')
.action(()=>
{
    console.log(JSON.stringify(todosarray,null,2))
});

// edit
program
.command('edit')
.argument('<id> , <id of todo>')
.argument('<name>', 'name of the todo')
.action((id,name)=>
{
    const newtodosarray = todosarray.map(todo=>
        {
                if(todo.id!=id) return todo
                    return {
                        id,
                        name
                    }
            });
            console.log(newtodosarray)
fs.writeFileSync("file1_test.json",JSON.stringify(newtodosarray),{encoding:"utf-8"})
});

//  delete
program
.command('delete')
.argument('<id> , <id of todo>')
.action((id)=>
{

    const new_arr = todosarray.filter(todo => todo.id!=id)
    fs.writeFileSync("file1_test.json",JSON.stringify(new_arr),{encoding:"utf-8"})
});

program.parse(process.argv);