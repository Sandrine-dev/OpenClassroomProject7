<template>

  <div class="Wall">

    <section class="container">
      <div class="card">
        <div class="card-body">
          <form action="" class="panel panel-default">
              <div class="d-flex align-items-start flex-column form-group">
                <label for="text" class="panel-heading form-label">Nouveau message</label>
                <textarea type="message" class="panel-body container-fluid form-contro" placeholder="nouveau message" rows="3"></textarea>
              </div>
              <div class="mb-3 align-items-start">
                <label for="formFileMultiple" class="form-label d-flex align-items-start">Ajoutez une image</label>
                <input class="form-control" type="file" id="formFileMultiple" multiple>
              </div>
              <div class="d-flex panel-footer form-group">
                <button class="btn btn-primary w-25">Publier</button>
                <button class="btn btn-primary w-25"><loading-component width="30"></loading-component></button>

              </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>




export default {
  
}
</script>

<style lang="scss">
  .card {
    border: #152544 solid 2px;
   }

  .btn-primary {
        background: #152544;
        border: none;
  }

</style>