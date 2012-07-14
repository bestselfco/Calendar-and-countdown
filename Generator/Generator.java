public class Generator
{ 
	static int minYear = 2007;
	static int maxYear = 2011;
	
	public static void main(String [] args)
	{
		for(int i=minYear; i<maxYear+1;i++){
			new Year(i);
		}
	}
}