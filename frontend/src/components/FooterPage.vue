<template>
    <div class="footer">
        <div class="container-fluid fixed-bottom">
            <div class="row">
                <div class="col bg-blue expand-lg d-flex justify-content-between">
                    <div class="footer-color"><img alt="Groupomania logo" src="../assets/logoblanc.png" class="logo-footer"> Groupomania résaux sociale</div>
                    <div class="footer-color">Site internet <img alt="copyright" src="../assets/copyright.png" class="logo-footer"> Sandrine Volpi</div>
                </div>
            </div>
        </div>
    </div>
 
</template>

<script>
    export default {
        name: "Footer",
    }
</script>

<style>
    .footer-color{
        color: white;
    }

    .logo-footer{
        width: 15px;
    }

    .bg-blue{
        background: #2c3e50
    }
</style>