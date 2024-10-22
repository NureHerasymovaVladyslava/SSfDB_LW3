namespace TrialProject.Server.Models
{
    public class CourseBlockLock
    {
        public int CourseBlockLockId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string AdditionalInfo { get; set; }
        public int Price { get; set; }
        public int TopicId { get; set; }
        public DateTime AttemptDate { get; set; }
    }
}
