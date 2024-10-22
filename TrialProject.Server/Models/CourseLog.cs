namespace TrialProject.Server.Models
{
    public class CourseLog
    {
        public int CourseLogId { get; set; }
        public DateTime ModifyDate { get; set; }

        public int CourseId { get; set; }
        public Course Course { get; set; }
    }
}
