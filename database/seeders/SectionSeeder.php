<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    { 
      DB::statement('SET FOREIGN_KEY_CHECKS=0;');
      DB::table('item_web_details')->truncate();
      DB::table('item_webs')->truncate();
      DB::table('section_webs')->truncate();
      DB::table('type_item_webs')->truncate();
      DB::statement('SET FOREIGN_KEY_CHECKS=1;');
      
     
      
        $sections = [
                        ['name'=> 'Inicio'],
                        ['name'=> 'Conocenos'],
                        ['name'=> 'Servicios'],
                        ['name'=> 'Contacto'],        
                    ];
 
        $types_elements =[
                      ['style'=>'btn','name'=>'button' ],
                      ['style'=>'btn-link','name'=>'link'],
                      ['style'=>'div','name'=>'div'],
                      ['style'=>'slide','name'=>'slide'],
                      ['style'=>'list','name'=>'list'],
                  ];
        
        $types_items =[
                      ['tag'=>4,'name'=>'header', 'is_main'=>0,],
                      ['tag'=>41,'name'=>'footer', 'is_main'=>0],
                      ['tag'=>41,'name'=>'hero', 'is_main'=>0],
                      ['tag'=>1,'name'=>'about-us', 'is_main'=>1],
                      ['tag'=>11,'name'=>'clients', 'is_main'=>1],
                      ['tag'=>12,'name'=>'contact', 'is_main'=>1],
                      ['tag'=>13,'name'=>'cta', 'is_main'=>1],
                      ['tag'=>2,'name'=>'frequently', 'is_main'=>1],
                      ['tag'=>21,'name'=>'portfolio', 'is_main'=>1],
                      ['tag'=>22,'name'=>'pricing', 'is_main'=>1],
                      ['tag'=>23,'name'=>'services', 'is_main'=>1],
                      ['tag'=>3,'name'=>'skills', 'is_main'=>1],
                      ['tag'=>31,'name'=>'team', 'is_main'=>1],
                      ['tag'=>32,'name'=>'why-us', 'is_main'=>1],
                  ];

        $items = [
                  ['section_web_id'=>1,'type_item_web_id'=>1,'title'=>'Soluciones únicas y flexibles a tu alcance.','footer'=>'We are team of talented designers making websites with Bootstrap','image'=>'images/items/home1.png'],
                  ['section_web_id'=>2,'type_item_web_id'=>4,'title'=>'CONÓCENOS','footer'=>'FUSIONAMOS LA INNOVACIÓN Y LA TECNOLOGÍA PARA OFRECER SOLUCIONES QUE IMPULSEN EL ÉXITO DE NUESTROS CLIENTES.','image'=>'assets/img/1.png'],
                  ['section_web_id'=>2,'type_item_web_id'=>14,'title'=>'NUESTROS OBJETIVOS','element'=>'slide','footer'=>'Somos mucho más que una empresa que te ofrece soluciones con tecnología; somos el socio tecnológico de negocios con el que puedes contar para abordar desafíos y alcanzar tus metas de manera efectiva.'],
                  ['section_web_id'=>3,'type_item_web_id'=>11,'title'=>'SERVICIOS','element'=>'div-not-head','footer'=>'','image'=>'images/items/home3.png'],
                  ['section_web_id'=>4,'type_item_web_id'=>6,'title'=>'CONTACTANOS','element'=>'div-not-head','footer'=>'','image'=>'images/items/home3.png'],
                  ['section_web_id'=>null,'type_item_web_id'=>2,'title'=>'FOOTER','element'=>'div-not-head','footer'=>'','image'=>'images/items/home3.png'],

        ];

        $item_details = [
                  ['item_web_id'=>1,'element_web_id'=>1,'name'=>'button-1','description'=>'Contáctanos','image'=>'',],
                 
                  ['item_web_id'=>2,'element_web_id'=>3,'name'=>'div-2','description'=>'Jorge May, CEO de Flexbetta.','image'=>'',],
                  ['item_web_id'=>2,'element_web_id'=>3,'name'=>'div-3','description'=>'Contamos con diversas unidades de negocio altamente especializadas en la provisión de soluciones y servicios informáticos eficientes, cada una dedicada a su área correspondiente.','image'=>'',],
                  ['item_web_id'=>2,'element_web_id'=>4,'name'=>'VISIÓN','description'=>'Ir más allá de lo convencional para convertirnos en el socio tecnológico de negocios de nuestros clientes mediante nuestra capacidad y compromiso inquebrantable para potenciar, expandir y perfeccionar el funcionamiento de su empresa o entidad.','image'=>'',],
                  ['item_web_id'=>2,'element_web_id'=>4,'name'=>'MISIÓN','description'=>'Hacer accesible la excelencia tecnológica y ser una empresa reconocida por facilitar el camino de nuestros clientes con soluciones innovadoras que sean intuitivas y eficientes.','image'=>'',],
                  
                  ['item_web_id'=>3, 'element_web_id'=>5, 'name'=>'01 Adaptación','description'=>'Adaptarnos a las metas específicas de cada cliente.','image'=>'images/ItemDetails/homedetail1.png',],
                  ['item_web_id'=>3, 'element_web_id'=>5, 'name'=>'02 Actualizarnos','description'=>'Estar actualizados en las tendencias y avances de la tecnología.','image'=>'images/ItemDetails/homedetail2.png',],
                  ['item_web_id'=>3, 'element_web_id'=>5, 'name'=>'03 Crear relaciones sólidas','description'=>'Nuestros clientes son nuestro pilar fundamental, por lo que es importante mantenerlos en un alto nivel de satisfacción con nuestras entregas de soluciones personalizadas en tiempo y forma. Creando así, relaciones sólidas y duraderas.','image'=>'images/ItemDetails/homedetail3.png',],
                  ['item_web_id'=>3, 'element_web_id'=>5, 'name'=>'04 Atraer a interesados en la tecnología','description'=>'Atraer y mantener a nuevos talentos en el campo de la tecnología.','image'=>'',],
                  ['item_web_id'=>3, 'element_web_id'=>5, 'name'=>'05 Mejorar continuamente','description'=>'Mejorar continuamente nuestros sistemas internos para reducir costos y aumentar la eficiencia.','image'=>'',],
                  ['item_web_id'=>3, 'element_web_id'=>5, 'name'=>'06 Posicionarnos como líderes de soluciones tecnológicas','description'=>'Expandir progresivamente nuestro portafolio de productos y servicios para posicionarnos como líderes de soluciones tecnológicas.','image'=>'',],
                 
                  ['item_web_id'=>4, 'element_web_id'=>3, 'name'=>'PRESENCIA WEB','description'=>'Desarrollamos y optimizamos su presencia en línea para impulsar suvisibilidad y atraer a suaudiencia objetivo.','image'=>'',],
                  ['item_web_id'=>4, 'element_web_id'=>3, 'name'=>'CONSULTORÍA INFORMÁTICA','description'=>'Proporcionamos asesoramiento experto para ayudarle a tomar decisiones informáticas estratégicas y maximizar el rendimiento de su infraestructura.','image'=>'',],
                  ['item_web_id'=>4, 'element_web_id'=>3, 'name'=>'SISTEMAS DE SOLUCIONES INTEGRALES','description'=>'Implementamos sistemas completos que comprenden componentes de infraestructura, software y servicios de gestión.','image'=>'',],
                  ['item_web_id'=>4, 'element_web_id'=>3, 'name'=>'GESTIÓN DE SISTEMAS','description'=>'Optimizamos y administramos sus sistemas informáticos para garantizar un rendimiento eficiente y sin contratiempos.','image'=>'',],
                  ['item_web_id'=>4, 'element_web_id'=>3, 'name'=>'CCTV PROFESIONAL','description'=>'Implementamos sistemas de vigilancia avanzados para garantizar la seguridad de su empresa con tecnología de vanguardia.','image'=>'',],
                  ['item_web_id'=>4, 'element_web_id'=>3, 'name'=>'SERVICIOS DE GESTIÓN DE PROYECTOS ','description'=>'basados en TICs.','image'=>'',],
                  ['item_web_id'=>4, 'element_web_id'=>3, 'name'=>'PRODUCTOS DE INFORMACIÓN GEOGRÁFICA ','description'=>'Ofrecemos soluciones de información basadas en GIS para el análisis espacial de datos, brindándole información valiosa para la toma de decisiones.','image'=>'',],
                  ['item_web_id'=>4, 'element_web_id'=>3, 'name'=>'DESARROLLO DE SOFTWARE','description'=>'Creamos soluciones personalizadas para satisfacer sus requisitos específicos, utilizando las últimas tecnologías y mejores prácticas de la industria.','image'=>'',],
                 
                  
       
        ];
        
        foreach ($types_elements as $types_element) {
          DB::table('element_webs')->insert($types_element);
        }

        foreach ($types_items as $types_item) {
          DB::table('type_item_webs')->insert($types_item);
        }
     
        foreach($sections as $section){
            DB::table('section_webs')->insert($section);
        }
        foreach ($items as $item) {
          DB::table('item_webs')->insert($item);
        }
     
    foreach ($item_details as $item_detail) {
      DB::table('item_web_details')->insert($item_detail);
    }
}
    
}
