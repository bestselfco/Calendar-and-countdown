

public class Year {
	
	private Month[] months;
	private int year;
	
	public Year(int year){
		
		months = new Month[12];
		
		this.year = year;
		
		for(int i = 0; i < 12; i++){
			this.months[i] = new Month(this.year, i, 1);
		}	
	}
	
}
