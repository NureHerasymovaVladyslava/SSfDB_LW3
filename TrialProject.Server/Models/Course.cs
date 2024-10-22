namespace TrialProject.Server.Models
{
    public class Course
    {
        public int CourseId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string AdditionalInfo { get; set; }
        public int Price { get; set; }
        public int PurchasedCount { get; set; }

        public int TopicId { get; set; }
        public Topic Topic { get; set; }
    }
}
