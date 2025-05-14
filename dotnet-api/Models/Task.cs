namespace TodoApi.Models;

public class TaskItem
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public bool? Completed { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
}
