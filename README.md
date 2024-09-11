<img src="https://res.cloudinary.com/proyectocarefy/image/upload/v1725058006/logo.png" alt="FormUser1" width="50" />  

# CAREFY


### **DESCRIPCION**
  #### 1) MOTIVACIÓN: 
  >Debido al aumento de la población anciana, principalmente en Europa, vimos la necesidad de poder facilitar a las familias una herramienta para conectar con cuidadores de personas adultas y así poder delegar esta tarea a profesionales experimentados.
  #### 2) ¿POR QUÉ DESARROLLAR ESTE PROYECTO?: 
  >La razón por la que desarrollamos este proyecto fue porque los adultos mayores se merecen que sean acompañados y cuidados hasta el final en mano de personas experimentadas.
  #### 3) ¿QUÉ PROBLEMA RESUELVE? 
  >Carefy viene a ofrecer una solución para las familias que deben delegar el cuidado de sus seres queridos a otras personas, por falta de tiempo o experiencia. De esta forma, la plataforma logra conectar profesionales con familias para que así juntos puedan darle lo mejor al adulto que requiere un cuidado especial.
  #### 4) ¿QUÉ APRENDIÓ? 
  >El desarrollo del proyecto nos enseñó 2 cosas principales:

> * Trabajar en equipo: desde plantear las ideas iniciales del proyecto tal como paleta de colores, vistas, imágenes, funcionalidades, hasta el control de versiones con Github. Estos fueron desafíos que fueron llenando de conocimientos al grupo y que fueron haciendo que el proyecto crezca día a día.
>
>   
> * Profundizar en conocimientos: haber desarrollado Carefy hizo que nuestros conocimientos en programación aumenten paso a paso con cada una de las funcionalidades que nos planteamos desarrollar.
  #### 5)¿QUÉ HACE QUE SU PROYECTO DESTAQUE? 
  > Carefy es una plataforma que ofrece tanto para las familias como para los cuidadores un control completo de sus perfiles y anuncios. Cada Anuncio cuenta con toda la información necesaria para que los cuidadores expertos conozcan al adulto que requiere un cuidado especial y así poder conectar con un solo click con el anunciante.

  > De esta forma, la familia puede ver aquellas personas que fueron postuladas y contratar al que mejor se adecue a sus necesidades. Al mismo tiempo, se podrá valorar el servicio del cuidador para que otras familias puedan conocer la calidad y experiencia del profesional.

  > Por otro lado, el cuidador puede hacer un seguimiento de sus postulaciones y verificar el estado de cada una, buscar anuncios según su ubicación y guardar como favoritos los anuncios que más les gustan.

  > La plataforma fue diseñada para personas mayores, por lo que su uso es muy sencillo y amigable, teniendo toda la información necesaria al alcance de la mano y a un click.


### **INSTALACIÓN**
Carefy no requiere de ningún tipo de instalación. Se puede acceder a través de URL y registrarse con el perfil que corresponda.


### **TECNOLOGÍAS UTILIZADAS**
* Cloudinary
* Flask mail


### **USO**
#### Uso Familiar 
El “usuario Familiar” (el que busca un cuidador) deberá ir al formulario de registro, completar email, nombre de usuario, contraseña y seleccionar “Busco un profesional”. De esta forma, se registrará con todas las funcionalidades de un usuario que quiere publicar un anuncio y buscar un cuidador.

<img src="https://res.cloudinary.com/proyectocarefy/image/upload/v1725021101/FormUser1.png" alt="FormUser1" width="200" />


En primer lugar tendrá que completar sus datos personales como responsable del adulto mayor que necesitará el cuidado.

<img src="https://res.cloudinary.com/proyectocarefy/image/upload/v1725021462/FormUser2.png" alt="FormUser2" width="200" />


Luego, podrá añadir a sus seres queridos con el botón de “Agregar familiar”, justo debajo del formulario con los datos del usuario.

<img src="https://res.cloudinary.com/proyectocarefy/image/upload/v1725021609/AddFamiliar.png" alt="AddFamiliar" width="200" />


En el modal para añadir un familiar podrá completar todos los datos personales del adulto que requiere acompañamiento. Es crucial que se rellenen todos los datos para que luego, a la hora de crear un Anuncio, este refleje toda la información necesaria. Sólo es opcional el campo de la fotografía. 

<img src="https://res.cloudinary.com/proyectocarefy/image/upload/v1725022573/ModalAgregarFamiliar.png" alt="AddFamiliar" width="200" />


Para crear un Anuncio, tras crear un familiar, podrá hacerlo a través del botón “Publicar anuncio” que se encuentra en diferentes sitios de la plataforma, como debajo de los familiares, o en tu menú de usuario que está en la parte superior derecha
Al momento de crear un Anuncio, tendrá que seleccionar el familiar indicado y completar algunos datos, tal como:

* Tipo de servicio (interno o externo)
* Fecha de inicio
* Fecha de fin (opcional)
* Pago por hora
* Título
* Descripción

<img src="https://res.cloudinary.com/proyectocarefy/image/upload/v1725022887/AddAnuncio.png" alt="AddAnuncio" width="200" />
Tras crear el Anuncio, se hará en estado Pendiente hasta que un Administrador lo revise y lo apruebe. Solo los Anuncios en estado Publicado serán visibles para el resto de los usuarios.


Dentro de los Anuncios podremos hacer una gestión de las solicitudes que los cuidadores van haciendo, aparte de que también tendremos la posibilidad de editarlo y eliminarlo.


En el menú “Mis anuncios” tendremos una tabla con todos los anuncios que hemos creado a lo largo del tiempo, con el estado en que se encuentra cada uno. También podremos acceder a nuestro listado de “Perfiles favoritos” para ver los que más nos gustaron.

<img src="https://res.cloudinary.com/proyectocarefy/image/upload/v1725054916/listaanuncios1.png" alt="AddAnuncio" width="200" />

Para contratar un cuidador, simplemente le tendremos que dar al botón Contratar en nuestra tabla de Solicitudes. El resto quedará como “Rechazado”. El hecho de contratar un profesional nos dará la posibilidad de valorar su servicio con el botón “Valorar”. También podremos echar atrás la contratación con el botón de “Cancelar contrato”, lo que hará que todas las solicitudes vuelvan a mostrar el botón de “Contratar”.

<img src="https://res.cloudinary.com/proyectocarefy/image/upload/v1725055093/contratar.png" alt="AddAnuncio" width="200" /> <img src="https://res.cloudinary.com/proyectocarefy/image/upload/v1725055211/BotonValorar.png" alt="AddAnuncio" width="200" />

Para valorar un cuidador, primero tendremos que contratarlo. El botón de “Valorar” se hará visible y al darle nos llevará a la vista de reseñas para que le demos una puntuación del 1 a 5 y podamos también contar cómo fue nuestra experiencia con esa persona.

<img src="https://res.cloudinary.com/proyectocarefy/image/upload/v1725055334/Valoracion.png" alt="AddAnuncio" width="200" />

#### USUARIO CUIDADOR
El “Cuidador” deberá ir al formulario de registro, completar email, nombre de usuario, contraseña y seleccionar “Quiero ofrecer mi servicio”. De esta forma, se registrará con todas las funcionalidades de un usuario de tipo “Cuidador” que quiere crear un perfil público para ofrecer sus servicios y poder postularse a Anuncios.

<img src="https://res.cloudinary.com/proyectocarefy/image/upload/v1725055678/RegistroAcom.png" alt="AddAnuncio" width="200" />

En primer lugar tendrá que completar sus datos personales para crear el perfil. Entre estos podrá encontrar: foto, nombre, localidad, fecha de nacimiento, descripción, experiencia, redes sociales, etc.

Es crucial que se rellenen todos los datos porque esta es la información que el resto de usuarios podrá ver en su perfil.

<img src="https://res.cloudinary.com/proyectocarefy/image/upload/v1725055843/FormAcomp.png" alt="AddAnuncio" width="200" /> <img src="https://res.cloudinary.com/proyectocarefy/image/upload/v1725056087/PerfilCuidador.png" alt="AddAnuncio" width="200" />


En el perfil, además de toda la información personal, también se hará visible la valoración que los usuarios le han dejado y la reseña que acompaña esa valoración. En la parte superior, se podrá ver el promedio de todas ellas.

Para poder postularse a un Anuncio tendrá que acceder a él y darle al botón “Postularse”. Si quiere cancelar la postulación, le tendrá que dar al botón “Cancelar postulación”. Al mismo tiempo, con el icono del corazón, podrá guardar Anuncios como favorito.

<img src="https://res.cloudinary.com/proyectocarefy/image/upload/v1725056499/postularse.png" alt="AddAnuncio" width="200" /> <img src="https://res.cloudinary.com/proyectocarefy/image/upload/v1725056527/cancelarpostulacion.png" alt="AddAnuncio" width="200" /> <img src="https://res.cloudinary.com/proyectocarefy/image/upload/v1725056553/favPost.png" alt="AddAnuncio" width="200" />

En el menú “Mis postulaciones” podrá hacer un seguimiento de todas las postulaciones realizadas y ver el estado que se encuentra cada una.

* Pendiente: aún el anunciante no seleccionó ningún cuidador
* Contratado: el anunciante decidió contratarlo
* Rechazado: el anunciante contrató a otro cuidador

Desde aquí también podrá ver los Anuncios guardados como favoritos y acceder a ellos.

<img src="https://res.cloudinary.com/proyectocarefy/image/upload/v1725056827/estadopost.png" alt="AddAnuncio" width="200" />


#### Usos generales para todos los tipos de usuarios

Todos los usuarios podrán ver en el Inicio un buscador para buscar perfiles de cuidadores o anuncios por Ubicación.
Se podrá acceder a todos los Anuncios publicados y a todos los perfiles de cuidadores. Cada una de estas páginas tiene su buscador correspondiente.
<img src="https://res.cloudinary.com/proyectocarefy/image/upload/v1725057113/buscador.png" alt="AddAnuncio" width="200" />


Los usuarios también podrán conocernos a través de la página Nosotros, resolver sus dudas con el FAQ y contactarnos a través del formulario de Contacto.

<img src="https://res.cloudinary.com/proyectocarefy/image/upload/v1725057287/nosotros.png" alt="AddAnuncio" width="200" /> <img src="https://res.cloudinary.com/proyectocarefy/image/upload/v1725057314/faq.png" alt="AddAnuncio" width="200" /> <img src="https://res.cloudinary.com/proyectocarefy/image/upload/v1725057328/contacto.png" alt="AddAnuncio" width="200" />





### **CRÉDITOS**
El proyecto fue desarrollado por:
* Juan Tomás Poves
* Laura Pacheco
* Javier Diez


### **LICENCIA**
GNU Affero General Public License v3.0

### **INSIGNIAS**
<img src="https://carnejovenmadrid.com/sites/default/files/2023-05/4geeks.jpg" alt="Logo de 4Geeks" width="150" /> <img src="https://res.cloudinary.com/proyectocarefy/image/upload/v1725023254/mejorServicio.png" alt="Logo de 4Geeks" width="150" />

### **FUNCIONES**
* Creación de varios tipos de perfiles (administrador, usuario y cuidador)
* Login/SignUp - SignOut
* Formularios de registro editables.
* CRUD Familiares
* CRUD Anuncios
* Posibilidad de postularse a un anuncio y cancelar postulación
* Posibilidad de contratación de un acompañanate y cancelar contratación
* Posibilidad de valorar mediante una reseña la valoración al acompañante.
* Moderación de anuncios desde perfil administrador.


### **CONTRIBUCIONES**
Hay muchas maneras en las que usted puede participar en este proyecto:

* Contribuyendo a traducir el site.
* Información sobre errores y fallos de la página.
* Soporte para corrección de errores.
* Pautas de codificación.

### **PRUEBAS**
La aplicación se ha probado de diversas formas, con la finalidad de llegar a hacerla lo más óptima posible:

* Registros de usuarios en sus diferentes perfiles.
* Creacion, edición y eliminación de familiares.
* Creación, edición y eliminación de anuncios.
* Postulaciones y cancelación de postulaciones de un acompañante hacia un anuncio.
* Contratación y descontratación de perfiles de acompañantes.
* Pruebas para valorar al acompañanate, obteniendo la media de sus notas.

