var allEditors = document.querySelectorAll('.editor');
var urlEdit = $('#url').val();
var editorInstances = []; // Array to store references to editor instances

for (var i = 0; i < allEditors.length; ++i) {
    const editorId = allEditors[i].id; // Get the ID of the textarea element
    ClassicEditor
        .create(allEditors[i], {
            language: 'es',
            toolbar: ['heading', '|', 'bold', 'italic', '|']
        })
        .then(editor => {
            console.log("Editor with ID", editorId, "was initialized", editor);
            editorInstances.push({ id: editorId, editor: editor }); // Push the editor instance and its ID into the array
        })
        .catch(error => {
            console.error(error);
        });
}

function getAllEditorContent() {
    editorInstances.forEach(editorData => {
        const content = editorData.editor.getData();
        var plainTextContent ='';
        const collection = document.getElementsByClassName(editorData.id);
        if(editorData.id.toLowerCase().includes("button")){
           plainTextContent= content.replace(/<p>|<\/p>|<h1>|<\/h1>|<h2>|<\/h2>|<h3>|<\/h3>/g, '');
        }else{
          plainTextContent = content;
        }
        collection[0].innerHTML = plainTextContent;
   
    });
}

function saveAllEditorContent(item = {title:'',footer:'', children:[]}) {
  const data = item;
  const titleEditor = editorInstances.find(obj => obj.id === 'title-'+item.id);
  const footerEditor = editorInstances.find(obj => obj.id === 'footer-'+item.id);

  const title = titleEditor.editor.getData();
  const footer = footerEditor.editor.getData();

  data.title = title;
  data.footer = footer;

  data.children.forEach(child => {
        if(child.element_web.name == 'button'){

          const editorDescription = editorInstances.find(obj => obj.id === child.element_web.name+'-description-'+child.id);
          const description = editorDescription.editor.getData();
          var cleanDescription = description.replace(/<p>|<\/p>|<h1>|<\/h1>|<h2>|<\/h2>|<h3>|<\/h3>/g, '');
          child.name = cleanDescription;
          child.description = cleanDescription;

        }else if(child.element_web.name == 'link'){
          child.name = $("#"+child.element_web.name+'-name-'+child.id).val();
          child.description = $("#"+child.element_web.name+'-description-'+child.id).val();
        }else{
          const editorName = editorInstances.find(obj => obj.id === child.element_web.name+'-name-'+child.id);
          const editorDescription = editorInstances.find(obj => obj.id === child.element_web.name+'-description-'+child.id);

          const name = editorName.editor.getData();
          const description = editorDescription.editor.getData();


          child.name = name;
          child.description = description;
        }
  });
    console.log(data);
    return data;

}
function returnsubmod(data) {
  messages(data);
  window.location.href = urlEdit;
}


//section for const js 
const editItemweb = {
  save: function (item = '') {

    Swal.fire({
      title: "Desea aplicarlos cambios en el contenido?",
      text: "Si aplica los cambios, se refejaran en el sitio web",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, aplicalos!',
      cancelButtonText: 'Continuar editando!'
    }).then((result) => {
      if (result.value) {
        var form =  saveAllEditorContent(item);
        var my_url = urlEdit;
        var type = "PUT";
        var result =  actions.save(type, my_url, 'update', form, 'submod');
      }
    });
    
  },
  show_form: function(name){
    $("#"+name).toggle();
  },
  back: function () {

    Swal.fire({
      title: "¿Deseas salir de la edicion?",
      text: "No has aplicado tus cambios a un, ¿Estas seguro?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, No los apliques!',
      cancelButtonText: 'Continuar editando!'
    }).then((result) => {
      if (result.isConfirmed) {
            // Allow the user to leave the page
            return true;
        } else {
            // Prevent the user from leaving the page
            event.preventDefault();
        }
    });

    },

};



