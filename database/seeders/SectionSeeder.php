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

        $types_items =[
                      ['tag'=>1,'name'=>'div-not-head'],
                      ['tag'=>11,'name'=>'div-not-head-left'],
                      ['tag'=>12,'name'=>'slide'],
                      ['tag'=>13,'name'=>'div-not-head'],
                      ['tag'=>2,'name'=>'div-not-head'],
                      ['tag'=>21,'name'=>'div-group'],
                      ['tag'=>22,'name'=>'div-group-img'],
                      ['tag'=>23,'name'=>'div-yellow'],
                      ['tag'=>3,'name'=>'div-not-head-left'],
                      ['tag'=>31,'name'=>'div-not-head'],
                      ['tag'=>32,'name'=>'div-group'],
                      ['tag'=>4,'name'=>'div-not-head'],
                      ['tag'=>41,'name'=>'div-group-head'],
                  ];

        $items = [
                  ['section_web_id'=>1,'type_item_web_id'=>1,'title'=>'High Quality Service at competitive Prices','element'=>'div-not-head','footer'=>'end0','image'=>'images/items/home1.png'],
                  ['section_web_id'=>1,'type_item_web_id'=>1,'title'=>'Staffing 24/7 to meet your needs','element'=>'div-not-head-left','footer'=>'end1','image'=>'images/items/home2.png'],
                  ['section_web_id'=>1,'type_item_web_id'=>1,'title'=>'Some of our clients','element'=>'slide','footer'=>'end2'],
                  ['section_web_id'=>1,'type_item_web_id'=>1,'title'=>'Do you want to be Dedicated','element'=>'div-not-head','footer'=>'end3','image'=>'images/items/home3.png'],
                  ['section_web_id'=>2,'type_item_web_id'=>1,'title'=>'We are Dedicated People, partners that become an extension of your team','element'=>'div-not-head','footer'=>'end0','image'=>'images/items/aboutus1.png'],
                  ['section_web_id'=>2,'type_item_web_id'=>1,'title'=>'How can we make this possible?','element'=>'div-group','footer'=>'end1'],
                  ['section_web_id'=>2,'type_item_web_id'=>1,'title'=>'Work enviroment based on communication and people','element'=>'div-group-img','footer'=>'end2'],
                  ['section_web_id'=>2,'type_item_web_id'=>1,'title'=>'Meet the team','element'=>'div-yellow'],
                  ['section_web_id'=>3,'type_item_web_id'=>1,'title'=>'A partnership with us means a full support of our team','element'=>'div-not-head-left','footer'=>'end0','image'=>'images/items/ourservice1.png'],
                  ['section_web_id'=>3,'type_item_web_id'=>1,'title'=>'IT support','element'=>'div-not-head','footer'=>'end1','image'=>'images/items/ourservice2.png'],
                  ['section_web_id'=>3,'type_item_web_id'=>1,'title'=>'The corner stone of our costumer service','element'=>'div-group','description'=>'Our success is ensuring yours!','footer'=>'end2'],
                  ['section_web_id'=>4,'type_item_web_id'=>1,'title'=>'We’ll be there every step of the way','element'=>'div-not-head','footer'=>'end0','image'=>'images/items/careers1.png'],
                  ['section_web_id'=>4,'type_item_web_id'=>1,'title'=>'Become Dedicated Step by Step','element'=>'div-group-head','footer'=>'end1'],


        ];

        $item_details = [
                  ['item_web_id'=>1,'name'=>'detail11','description'=>'We are TAS representatives staffing agency committed to partnering with you to become an extension of your team.','image'=>null],
                  ['item_web_id'=>1,'name'=>'detail12','description'=>'Our capable team is prepared with training programs full of activities focused on message taking, soft skills and empathy.','image'=>null],
                  ['item_web_id'=>1,'name'=>'detail13','description'=>'We provide daily feedback to ensure our representatives top performance.','image'=>null],
                 
                  ['item_web_id'=>2,'name'=>'detail21','description'=>'Hiring an in-house employee actually costs 25%-40% above their wages\/salary.','image'=>null],
                  ['item_web_id'=>2,'name'=>'detail22','description'=>'With Dedicated People you only pay for our representatives hourly rate. You get the same level of quality you expect from you current employees without the high cost of in-house labor.','image'=>null],
                  
                  ['item_web_id'=>3,'name'=>'Timothy Stroud Manager - Training, Quality & Operations Support','description'=>'Dedicated People has been a reliable partner for Anserve, staffing well-spoken bi-lingual agents that cover multiple shifts for us.   They have an excellent training program, coupled with solid on-going coaching reinforcement for continual improvement.  When CoVid-19 hit, their IT staff displayed fast acting agility in arranging for all of their agents to be able to work from home with no disruption of availability or top quality service.  All in all, we have been very satisfied with our relationship with Dedicated People and see a bright future with them.','image'=>'images/ItemDetails/homedetail1.png'],
                  ['item_web_id'=>3,'name'=>'Celia Vincent Broussard','description'=>'“Dedicated People was a lifesaver to Southwest Call Center, Inc. in the early days after Hurricane Laura made landfall in late August of 2020.  Our area was without power and electricity and our staff was not able to connect into our system.  We had just begun our relationship with Dedicated People, and with their help, we were able to quickly add additional agents so that we would be able to answer calls.  They have been wonderful to work with and I look forward to continuing our relationship with them.”','image'=>'images/ItemDetails/homedetail2.png'],
                  ['item_web_id'=>3,'name'=>'Andrew Breischaft','description'=>'We are very impressed with Dedicated People and their whole operation!  After so many interviews and training with no long term employees to show for our own efforts, we contacted Dedicated People and now have 3 operators who are respectful, intelligent and eager to learn. Not only are you gaining an employee or employees that are trained on your company’s platform, but Dedicated People continues to work with their staff even after the training period is over and the employees have moved on to their new position(s).  The feedback, the communication, and the follow up with their staff have all been top notch!  Working with the entire team at Dedicated People, from the owner to management to the training staff, has been a pleasure as every single team member is so professional and courteous. We recommend Dedicated People wholeheartedly!','image'=>'images/ItemDetails/homedetail3.png'],
                  ['item_web_id'=>3,'name'=>'detail34','description'=>'example end example end example end example endexample end example end example end example end example end example end','image'=>null],
                  ['item_web_id'=>'4','name'=>'detail41','description'=>'Work with us! We are looking for positive people who are comfortable with multitasking, have an understanding of phone etiquette, excellent verbal and written communication skills and want to grow with us.','image'=>null],
                 
                  ['item_web_id'=>5,'name'=>'detail51','description'=>'We understand the high demands of the TAS industry.','image'=>null],
                  ['item_web_id'=>5,'name'=>'detail52','description'=>'Our goal is to become the staffing partner that helps you succeed & grow your business','image'=>null],
                 
                  ['item_web_id'=>6,'name'=>'Trained representatives','description'=>'By creating a solid, stable work environment our partnership with your company develops highly trained representatives who are dedicated to offering top quality customer service.','image'=>'images/ItemDetails/aboutusdetail1.png'],
                  ['item_web_id'=>6,'name'=>'Following the procedures','description'=>'Our trainers work closely with our clients to understand their processes and procedures.','image'=>'images/ItemDetails/aboutusdetail2.png'],
                  ['item_web_id'=>6,'name'=>'Assigned a supervisor','description'=>'Once you partner up with Dedicated People, your company and representatives will be assigned a team supervisor and account manager at no extra cost to you.','image'=>'images/ItemDetails/aboutusdetail3.png'],
                  ['item_web_id'=>6,'name'=>'Following the standards','description'=>'Our Dedicate People QA staff work with you to understand the standards you qualify for your in-house representatives and how.','image'=>'images/ItemDetails/aboutusdetail4.png'],
                  ['item_web_id'=>6,'name'=>'Constant monitoring','description'=>'We monitor all our representatives calls closely to ensure we are providing the daily feedback.','image'=>'images/ItemDetails/aboutusdetail5.png'],
                  ['item_web_id'=>7,'name'=>'CONTINUOUS EDUCATION','description'=>'We provide high quality, ongoing training to ensure our representatives are up to date with quality standards and system upgrades.','image'=>'images/ItemDetails/aboutusWE1.png'],
                  ['item_web_id'=>7,'name'=>'TECHNOLOGY','description'=>'Dedicated People’s IT staff stay up to date by regularly researching upgrades and becoming educated with all of the TAS technologies available. We offer adequate IT support','image'=>'images/ItemDetails/aboutusWE2.png'],
                  ['item_web_id'=>7,'name'=>'EMPLOYEE WELL-BEING','description'=>'We provide high quality, ongoing training to ensure our representatives are up to date with quality standards and system upgrades.','image'=>'images/ItemDetails/aboutusWE3.png'],
                  ['item_web_id'=>7,'name'=>'DEDICATION & COMMITMENT','description'=>'We promote our staff’s commitment to the company and our clients through a positive work environment and incentive programs – at no extra cost to our clients.','image'=>'images/ItemDetails/aboutusWE4.png'],
                  ['item_web_id'=>7,'name'=>'TRUST & CONFIDENCE','description'=>'Ideas, suggestions and feedback that promote our company’s and our client’s benefit come from all of our team members. As Dedicated People we are open to hearing from all our collaborators.','image'=>'images/ItemDetails/aboutusWE5.png'],
                  ['item_web_id'=>7,'name'=>'EQUALITY','description'=>'Dedicated People is an equal opportunity employer. Our positive focus on our team makes us a place where people want to work.','image'=>'images/ItemDetails/aboutusWE6.png'],
                  ['item_web_id'=>8,'name'=>'Don Corville','description'=>'Owner','image'=>'images/ItemDetails/DON.png'],
                  ['item_web_id'=>8,'name'=>'Jason Robichaux','description'=>'Owner','image'=>'images/ItemDetails/JASON.png'],
                  ['item_web_id'=>8,'name'=>'Alex Ortega','description'=>'Business Administrator','image'=>'images/ItemDetails/ALEX.png'],
                  ['item_web_id'=>8,'name'=>'Melissa Araque','description'=>'Account Manager','image'=>'images/ItemDetails/MELISSA.png'],
                  ['item_web_id'=>8,'name'=>'Michelle Castro','description'=>'Callcenter Manager','image'=>'images/ItemDetails/MICHELLE.png'],
                  ['item_web_id'=>8,'name'=>'Juan Maldonado','description'=>'Supervisors Manager','image'=>'images/ItemDetails/JUAN.png'],
                  ['item_web_id'=>8,'name'=>'Oscar Ramirez','description'=>'Hiring Manager','image'=>'images/ItemDetails/OSCAR.png'],
                  ['item_web_id'=>9,'name'=>'detail81','description'=>'We take care of the complete recruiting and hiring process.','image'=>null],
                  ['item_web_id'=>9,'name'=>'detail82','description'=>'Our pricing is tiered based on the number of agents you have on your team.','image'=>null],
                  ['item_web_id'=>9,'name'=>'detail83','description'=>'You only pay your agents’ hourly rate.','image'=>null],
                  ['item_web_id'=>9,'name'=>'detail84','description'=>'We use your training guides to teach agents how to effectively take call for you.','image'=>null],
                  ['item_web_id'=>10,'name'=>'detail91','description'=>'Our team provides you with full IT assistance starting from the initial set up process.','image'=>null],
                  ['item_web_id'=>10,'name'=>'detail92','description'=>'Our equipment is updated continuously and we have the proper redundancy support onsite in case of emergencies.','image'=>null],
                 
                  ['item_web_id'=>11,'name'=>'BEING EFFICIENT & COST-EFFECTIVE','description'=>'Partnering with us, you will see your productivity increased as you and your top staff will be able to focus on your business’ day to day activities.','image'=>'images/ItemDetails/ourservicedetail1.png'],
                  ['item_web_id'=>11,'name'=>'COMPETENCE','description'=>'We handle your calls with the same level of quality you expect from your in-house staff.','image'=>'images/ItemDetails/ourservicedetail2.png'],
                  ['item_web_id'=>11,'name'=>'STATE-OF-THE-ART TECHNOLOGY','description'=>'Our fully equipped facility makes remoting into your system and call handling seamless – just like in your office.','image'=>'images/ItemDetails/ourservicedetail3.png'],
                  ['item_web_id'=>11,'name'=>'WORKFORCE MANAGEMENT','description'=>'You can personalize and adjust staffing and schedules to your company needs.','image'=>'images/ItemDetails/ourservicedetail4.png'],
                  ['item_web_id'=>12,'name'=>'detail111','description'=>'The North American Telephone Answering Service is a fast-paced, high demand industry.','image'=>null],
                  ['item_web_id'=>12,'name'=>'detail112','description'=>'As one of our collaborators, you’ll receive continuous training & support from our dedicated team to ensure a long, successful career with Dedicated People.','image'=>null],
                  ['item_web_id'=>11,'name'=>'ADJUSTABLE KPI','description'=>'We work with you to understand and help our representatives meet the same performance metrics you measure.','image'=>'images/ItemDetails/ourservicedetail5.png'],
                  ['item_web_id'=>13,'name'=>'Talk to a recruiter','description'=>'Submit your information, and one of our Talent Hunters will reach out to you.','image'=>'images/ItemDetails/careersdetail1.png'],
                  ['item_web_id'=>13,'name'=>'Prepare','description'=>'Make sure you have your updated resume printed out and ready','image'=>'images/ItemDetails/careersdetail2.png'],
                  ['item_web_id'=>13,'name'=>'Interview','description'=>'Be punctual.','image'=>'images/ItemDetails/careersdetail3.png'],
                  ['item_web_id'=>13,'name'=>'Get hired','description'=>'Once all of the pieces are in place, you’ll start training for your career with Dedicated People.','image'=>'images/ItemDetails/careersdetail4.png'],
       
        ];

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
