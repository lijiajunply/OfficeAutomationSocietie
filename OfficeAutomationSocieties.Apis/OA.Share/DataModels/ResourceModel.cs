﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OA.Share.DataModels;

public class ResourceModel
{
    [Key]
    [Column(TypeName = "varchar(256)")]
    public string Id { get; set; }
    public string Name { get; set; }
    public UserModel User { get; set; }
    public string StartTime { get; set; }
    public string EndTime { get; set; }
}