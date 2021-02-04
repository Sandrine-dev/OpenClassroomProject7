<template>
    <div class="Profile container">
        <h1>Informations personnelles</h1>

        <section>
            <div class="card">
                <div class="card-body">
                    <div class="d-flex align-items-start flex-column form-group">
                        <label for="newBio" class="form-label">Votre poste:</label>
                        <input type="text" name="Poste" id="Poste" class="form-control">
                    </div>
                    <button type="submit" class="btn btn-primary w-35">Valider</button>

                </div>
            </div>
            <div class="card">
                <div class="card-body card-end">
                    <div class="mb-3 align-items-start">
                        <label for="formFileSm" class="form-label d-flex align-items-start">Ajoutez une image</label>
                        <input class="form-control form-control-sm" type="file" id="file" ref="fileInput" v-on:change="onFileUpload">
                    </div>
                </div>    
            </div>
        </section>
    </div>
    
</template>

<script>
export default {
    
}
</script>

<style lang='scss'>
</style>