using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OA.Share.DataModels;

public class ProjectModel
{
    public List<UserModel> Members { get; set; } = new();
    public string Name { get; set; }
    
    [Key]
    [Column(TypeName = "varchar(256)")]
    public string Id { get; set; }
    
    public List<FileModel> Files { get; set; }
    
    /// <summary>
    /// 示例:
    /// User1 : 2023/01/01 - 2023/02/01 : 写代码
    /// User2 : 2023/03/01 - 2023/04/01 : 写代码
    /// </summary>
    public string Gantt { get; set; }
}

public class GanttModel
{
    public UserModel User { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public string ToDo { get; set; }

    public GanttModel() { }

    public GanttModel(string s)
    {
        var gantt = s.Split(':');
        if(gantt.Length != 3)return;
        User = new UserModel() { UserId = gantt[0] };
        ToDo = gantt[^1];
        var time = gantt[1];
        var times = time.Split('-');
        if(times.Length != 2)return;
        StartTime = DateTime.Parse(times[0]);
        EndTime = DateTime.Parse(times[1]);
    }
}