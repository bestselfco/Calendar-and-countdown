import java.util.Calendar;
import java.util.GregorianCalendar;


public class Month {

	private GregorianCalendar cal;
	
	private int month;
	private int year;
	private int daysInMonth;

	private int[] data;
	
	private String monthString;
	
	
	public Month (int Year, int Month, int FirstDayOfWeek)
	{
		this.cal = new GregorianCalendar(Year, Month, 1); //Calendar class for checks and stuff
		this.year = Year;
		this.month = Month;
		this.daysInMonth = getNumberOfDays();
		
		cal.setFirstDayOfWeek(FirstDayOfWeek);
		this.data = getMonthArray();
		
		this.monthString = createString();
		
		System.out.println(monthString);
		
	}
	
	//Build a week
	public String createWeek(int month, int year, int fromDate, int offset)
	{
		String output = "";
		String dateString = year + "_" + month + "_" + fromDate;
		GregorianCalendar cal = new GregorianCalendar(year,month,fromDate);
		
		int weekNo = cal.get(Calendar.WEEK_OF_YEAR);
		
		output += "<td class='cal_weeknumber'>"+weekNo+"</td>";
		
		for(int i = 0;i<offset;i++)
		{
			output += "<td class='cal_emptyday'></td>";
		}
		
		for(int i = 0;i < (7-offset);i++)
		{
			output += "<td cal_month='"+month+"' cal_year='"+year+"' cal_day='"+fromDate+"' cal_date='"+dateString+"' class='cal_day'></td>\n";
		}
		
		return output;
		
	}
	
	//Parse array and read it all
	public String createString()
	{
		
		
		String r = "<table>";
		
		for(int i = 0; i < this.data.length; i++)
		{
			
	
		
				r = r + "<td>";
				r = r + this.data[i];
				r = r + "</td>";
		
	
			
		}
		
		r += "</table>";
		
		return r;
		
	}
	
	private int[] getMonthArray()
	{
		int[] r = generateStartArrayNew();
		
		int firstday = this.cal.get(Calendar.DAY_OF_WEEK);
		
		for(int i = 1; i < daysInMonth + 1; i++)
		{
			cal.set(Calendar.DAY_OF_MONTH,i);
			
			int inWeek = cal.get(Calendar.WEEK_OF_MONTH) - 1 ;
			int dayOfWeek = cal.get(Calendar.DAY_OF_WEEK);
			int dayOfWeekInMonth = cal.get(Calendar.DAY_OF_WEEK_IN_MONTH);
			
			r[i+firstday] = i;
			
			/*
			r[inWeek][0] = cal.get(Calendar.WEEK_OF_YEAR);
			r[inWeek][dayOfWeek] = i;
			*/
			
			System.out.println(this.year+""+this.month+"i:"+i+" w:"+inWeek+" d:"+dayOfWeek + " dwim:"+dayOfWeekInMonth);
			
		}
		
		return r;
		
	}
	
	public int getNumberOfDays()
	{
		//Base case
		int days = 30;
		
		//Months of 31
		if(this.month == 0 || this.month == 2 || this.month == 4 || this.month == 6 || this.month == 7 || this.month == 9 || this.month == 11)
		{
			days = 31;
		}
		else if(this.month == 1) //February
		{
			if(cal.isLeapYear(this.year)){ days = 29; } else { days = 28; }
		}
		
		return days;
	}
	
	private int[][] generateStartArray(){
		
		int[][] r = new int[6][8];
		
		return r;
	
	}
	
	private int[] generateStartArrayNew() {
		
		int[] r = new int[42];
		
		return r;
		
	}
	
}
