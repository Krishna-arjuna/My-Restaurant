
import java.util.Scanner;

class demo{
    public void show(){
        System.out.println("MENU\n1.Chiken Biriyani Rs-140\n2.MuttonBiriyani Rs-240\n3.Chicken lolipop Rs-120\n4.Chiken Butter Masala Rs-180\n5.Butter nan Rs-20\n5.Exit");
    }
}
public class setup{
    public static void main(String[] args) {
        Scanner sc=new Scanner (System.in);
        System.out.println("Welcome to Hotel Kariyappa");
        demo obj =new demo();
        obj.show();
        System.out.println("What are you carving for today🤤?");
        int totalbill=0;
        int choice ;
        String  r1="Chiken Biriyani Rs-140";
        String  r2="MuttonBiriyani Rs-240";
        String  r3="Chickem lolipop Rs-120";
        String  r4="Chiken Butter Masala Rs-180";
        String  r5="Butter Nan Rs-40";
        String r6="Thank you visit again";
       
        do { 
             
         choice= sc.nextInt();
       
            switch(choice){
                case 1:
                System.out.println("great choice "+r1);
                totalbill +=140;
                break;
                case 2:
                System.out.println("love'd it "+r2);
                totalbill +=240;
                break;
                case 3:
                System.out.println("nice taste "+r3);
                totalbill +=120;
                break;
                case 4:
                System.out.println("man killing it "+r4);
                totalbill +=180;
                break;
                case 5:
                System.out.println("how about more "+r5);
                totalbill +=40;
                break;
                case 6:
                System.out.println("\n🧾checkout completed");
                System.out.println("Your total bill is "+totalbill);
                System.out.println(r6);
                break;
            }
            
        } while (choice!=6);
        
    }
}