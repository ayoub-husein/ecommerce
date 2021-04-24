import '@laylazi/bootstrap-rtl/dist/css/bootstrap-rtl.min.css';
import './css/style.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'jquery/dist/jquery'
import 'popper.js/dist/popper'
import '@fortawesome/fontawesome-free/js/all'


    
$(function(){
    
    $('[data-toggle="tooltip"]').tooltip()

    $('.add-to-card-btn').click(function(){
        alert('أضيف المنتج الى عربة الشراء')
    });

    $('#copyright').text("جميع الحقوق محفوظة للمتجر لسنة " + new Date().getFullYear());

    $('.product-option input[type="radio"]').change(function(){
        $(this).parents('.product-option').siblings().removeClass('active');
        $(this).parents('.product-option').addClass('active');
      });

      $('[data-product-quntity]').change(function() {

        //اجلب الكمية الجديدة
        var newQuantity= $(this).val();
    
        //ابحث عن السطر الذي يحتوي معلومات هذا المنتج
        var parent = $(this).parents('[data-product-info]');
    
        //اجلب سعر القطعة الواحدة من معلومات المنتج
        var pricePerUnit = parent.attr('data-product-price');
    
        //السعر الإجمالي للمنتج هو سعر القطعة مضروبا بعددها
        var totalPriceForProduct = newQuantity * pricePerUnit;
    
        //عين السعر الجديد ضمن خلية السعر الإجمالي للمنتج في هذاالسطر
        parent.find('.total-price-for-product').text(totalPriceForProduct + '$');

        // حدث السعر الاجمالي لكل المنتجات
        calculateTotelPrice();
    });  

    $('[data-remove-from-cart]').click(function(){
        $(this).parents('[data-product-info]').remove();
        
        // اعد حساب السعر الاجمالي بعد حذف احد المنتجات
        calculateTotelPrice();
    })

    function calculateTotelPrice() {
        // أنشئ متغر جديد لحفظ السعر الاجمالي
        var totalPriceForAllProducts = 0;
        // لكل سطر يمثل معلومات المنتج في الصفحة
        $('[data-product-info]').each(function(){
            // اجلب سعر القطعة الواحدة من الخاصية الموافقة
            var pricePerUnit = $(this).attr('data-product-price');
            // اجلب كمية المنتج من حقل اختيار الكمية
            var quantity = $(this).find('[data-product-quntity]').val();
            var totalPriceForProduct = pricePerUnit * quantity;
            // اضف السعر الاجمالي لهذا المنتج الى السعر الاجمالي لكل المنتجات واحفظ القيمة في المتغر نفسه
            totalPriceForAllProducts = totalPriceForAllProducts + (totalPriceForProduct);
        });

        // حدث السعر الاجمالي لكل المنتجات في الصفحة
        $('#total-price-for-all-products').text(totalPriceForAllProducts + '$');
    }

    var citiesByCountry = {
        SA: ["الرياض","جدة"],
        EG: ["القاهرة","الأسكندرية"],
        JO: ["عمان","الزرقاء"],
        SY: ["دمشق","حلب","حماة"]
    };

    // عندما يتغير البلد

    $('#form-checkout select[name="country"]').change(function(){

        // أطلب رمز البلد
        var country = $(this).val();
        // اجلب مدن هاذا البلد من المصفوفة
        var cities = citiesByCountry[country];
        
        // فرغ قائمة المدن
        $('#form-checkout select[name="city"]').empty();
       
        // اضافة خيار اختر مدينة
        $('#form-checkout select[name="city"]').append(
            '<option disabled selected value="">أختر مدينة</option>'
        );
       
        // اضف المدن الى قائمة المدن
        cities.forEach(function(city){
            var newOption = $('<option></option>')
            newOption.text(city);
            newOption.val(city);
            $('#form-checkout select[name="city"]').append(newOption);
        });
    });

    // عندما تتغير طريقة الدفع
    $('#form-checkout input[name="payment-method"]').change(function(){
       
        // اجلب القيمة المختارة حالياً
        var paymentMethod = $(this).val();

        if(paymentMethod === 'on_delivery') {
        
            //اذا كانت عند الاستلام فعطل حقول بطاقة الائتمان
            $('#credit-card-info input').prop('disabled', true);
        
        }else{
           
            // والا ففعلها
            $('#credit-card-info input').prop('disabled', false);
        
        }

        // بدل معلومات بطاقة الائتمان بي الضهور والاخفاء
        $('#credit-card-info').toggle();


    })

});















